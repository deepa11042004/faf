"use client";

import { useEffect, useState } from "react";
import { galleryApi } from "@/services/api/galleryApi";
import { GalleryItem } from "@/types/admin";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { getMediaUrl } from "@/lib/axios";
import { compressImage } from "@/lib/imageCompressor";
import { Plus, Trash2, Image as ImageIcon, X } from "lucide-react";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [galCategory, setGalCategory] = useState("CCTV Installation");
  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await galleryApi.getGallery({ category, limit: 100 });
      if (res.success && res.data) {
        setGallery(res.data.gallery);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image file to upload.");
      return;
    }

    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", galCategory);
      formData.append("altText", altText);
      const compressedImage = await compressImage(imageFile);
      formData.append("image", compressedImage);

      await galleryApi.createGalleryItem(formData);
      setIsModalOpen(false);
      setTitle("");
      setAltText("");
      setImageFile(null);
      fetchGallery();
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await galleryApi.deleteGalleryItem(deleteId);
      setDeleteId(null);
      fetchGallery();
    } catch (error) {
      alert("Failed to delete gallery item.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-inter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bebas tracking-wide text-white">Media Gallery Management</h1>
          <p className="text-slate-400 text-sm">Upload and organize facility equipment & team photos.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0284C7] text-white text-sm font-semibold flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"
        >
          <option value="">All Categories</option>
          <option value="CCTV Installation">CCTV Installation</option>
          <option value="Fire Safety">Fire Safety</option>
          <option value="Access Control">Access Control</option>
          <option value="Security Guards">Security Guards</option>
          <option value="PA System">PA System</option>
          <option value="Housekeeping Services">Housekeeping Services</option>
        </select>
        <span className="text-xs text-slate-400 font-semibold">Total: {gallery.length} Images</span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-500">Loading gallery images...</div>
        ) : gallery.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">No images found for selected category.</div>
        ) : (
          gallery.map((item) => (
            <div key={item.id} className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg h-48">
              <img src={getMediaUrl(item.imagePath)} alt={item.title || "Gallery image"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <span className="text-[10px] bg-[#0284C7] text-white px-2 py-0.5 rounded-full w-fit font-semibold">{item.category}</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white truncate font-medium">{item.title || "Untitled"}</span>
                  <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bebas text-white mb-4">Upload Gallery Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 uppercase mb-1 font-semibold">Image Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase mb-1 font-semibold">Category *</label>
                <select
                  value={galCategory}
                  onChange={(e) => setGalCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white text-sm"
                >
                  <option value="CCTV Installation">CCTV Installation</option>
                  <option value="Fire Safety">Fire Safety</option>
                  <option value="Access Control">Access Control</option>
                  <option value="Security Guards">Security Guards</option>
                  <option value="PA System">PA System</option>
                  <option value="Housekeeping Services">Housekeeping Services</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase mb-1 font-semibold">Image File *</label>
                <input type="file" required accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0284C7] file:text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-700 text-slate-300 rounded-xl text-xs">Cancel</button>
                <button type="submit" disabled={formLoading} className="px-5 py-2 bg-[#0284C7] text-white rounded-xl text-xs font-semibold">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Image" description="Delete this photo from gallery?" loading={deleteLoading} />
    </div>
  );
}
