"use client";

import { useEffect, useState } from "react";
import { projectsApi } from "@/services/api/projectsApi";
import { ProjectItem } from "@/types/admin";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { getMediaUrl } from "@/lib/axios";
import { compressMultipleImages } from "@/lib/imageCompressor";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Building2,
  CheckCircle2,
  XCircle,
  X,
  Star
} from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete Modal
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [projCategory, setProjCategory] = useState("Commercial Security");
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsApi.getProjects({ search, category });
      if (res.success && res.data) {
        setProjects(res.data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, category]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleOpenModal = (item?: ProjectItem) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setSlug(item.slug);
      setProjCategory(item.category);
      setClientName(item.clientName || "");
      setLocation(item.location || "");
      setCompletionDate(item.completionDate || "");
      setDescription(item.description || "");
      setFeatured(item.featured || false);
      setStatus(item.status);
    } else {
      setEditingItem(null);
      setTitle("");
      setSlug("");
      setProjCategory("Commercial Security");
      setClientName("");
      setLocation("");
      setCompletionDate("");
      setDescription("");
      setFeatured(false);
      setStatus("active");
    }
    setImageFiles(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingItem) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("category", projCategory);
      formData.append("clientName", clientName);
      formData.append("location", location);
      formData.append("completionDate", completionDate);
      formData.append("description", description);
      formData.append("featured", String(featured));
      formData.append("status", status);

      if (imageFiles && imageFiles.length > 0) {
        const compressed = await compressMultipleImages(Array.from(imageFiles));
        for (let i = 0; i < compressed.length; i++) {
          formData.append("images", compressed[i]);
        }
      }

      if (editingItem) {
        await projectsApi.updateProject(editingItem.id, formData);
      } else {
        await projectsApi.createProject(formData);
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      alert("Failed to save project.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await projectsApi.deleteProject(deleteId);
      setDeleteId(null);
      fetchProjects();
    } catch (error) {
      alert("Failed to delete project.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bebas tracking-wide text-white">Project Portfolio Management</h1>
          <p className="text-slate-400 text-sm">Manage completed deployments and client case studies.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white text-sm font-semibold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#0284C7]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Commercial Security">Commercial Security</option>
            <option value="Industrial Safety">Industrial Safety</option>
            <option value="Residential Facilities">Residential Facilities</option>
            <option value="Government & Defense">Government & Defense</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            No projects found.
          </div>
        ) : (
          projects.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-all">
              <div>
                <div className="h-48 bg-slate-950 relative overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img src={getMediaUrl(item.images[0].imagePath)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                      <Building2 className="w-12 h-12" />
                    </div>
                  )}

                  {item.featured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-slate-950" /> Featured
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="text-xs text-[#38BDF8] font-semibold uppercase tracking-wider mb-1">{item.category}</div>
                  <h3 className="text-xl font-bebas tracking-wide text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-4">{item.description || "No description provided."}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/60 flex items-center justify-between mt-4">
                <span className="text-xs text-slate-500">{item.clientName || "Client Unspecified"}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenModal(item)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bebas tracking-wide text-white mb-6">
              {editingItem ? "Edit Project Details" : "Create Project Case Study"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category *</label>
                  <input
                    type="text"
                    required
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Completion Date</label>
                  <input
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Images (Multiple)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImageFiles(e.target.files)}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0284C7] file:text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-slate-800 text-[#0284C7] focus:ring-[#0284C7]"
                  />
                  <span>Feature on Homepage Portfolio</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm border border-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#0284C7] text-white"
                >
                  {formLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />}
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        description="Are you sure you want to delete this project case study?"
        loading={deleteLoading}
      />
    </div>
  );
}
