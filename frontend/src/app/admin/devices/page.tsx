"use client";

import { useEffect, useState, useRef } from "react";
import { devicesApi } from "@/services/api/devicesApi";
import { servicesApi } from "@/services/api/servicesApi";
import { DeviceItem } from "@/types/admin";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { getMediaUrl } from "@/lib/axios";
import { compressMultipleImages } from "@/lib/imageCompressor";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Cpu,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

// Image Catalog Mapping for multi-image sliders in Admin Cards
const CATEGORY_SLIDER_IMAGES: Record<string, string[]> = {
  // Security Guards
  "Residential Security Guards": [
    "/images/services/security-guards/residential-security-guards/img-exiamctq.jpg",
    "/images/services/security-guards/residential-security-guards/img-llicgcl7.jpg"
  ],
  "Commercial Security Guards": [
    "/images/services/security-guards/commercial-security-guards/img-0qqf0rjg.jpg",
    "/images/services/security-guards/commercial-security-guards/img-kdtedybx.jpg"
  ],
  "Industrial Security Guards": [
    "/images/services/security-guards/industrial-security-guards/img-a76ntaw8.jpg",
    "/images/services/security-guards/industrial-security-guards/img-io25lm2p.jpg"
  ],
  "Corporate Office Security": [
    "/images/services/security-guards/corporate-office-security/img-jhz9bsil.jpg",
    "/images/services/security-guards/corporate-office-security/img-xvzjl7vc.jpg"
  ],
  "Hotel Security": [
    "/images/services/security-guards/hotel-security/img-2lpwrhv1.jpg",
    "/images/services/security-guards/hotel-security/img-qrx0x7n6.jpg"
  ],
  "Hospital Security": [
    "/images/services/security-guards/hospital-security/img-0hi8skoy.jpg",
    "/images/services/security-guards/hospital-security/img-sk51hm5s.jpg"
  ],
  "School & College Security": [
    "/images/services/security-guards/school-college-security/img-0c4i3bfk.jpg",
    "/images/services/security-guards/school-college-security/img-apy5p9sz.jpg"
  ],
  "Warehouse Security": [
    "/images/services/security-guards/warehouse-security/img-pvqpmuq0.jpg",
    "/images/services/security-guards/warehouse-security/img-yis98onh.jpg"
  ],
  "Event Security": [
    "/images/services/security-guards/event-security/img-53jld5id.jpg",
    "/images/services/security-guards/event-security/img-stn2yv8t.jpg"
  ],
  "VIP Protection": [
    "/images/services/security-guards/vip-protection/img-6095veu5.jpg",
    "/images/services/security-guards/vip-protection/img-zllz3u2j.jpg"
  ],

  // CCTV Cameras
  "Dome Cameras": [
    "/images/cctv/dome/VP26P-T89uJ-K4JLfuW_mCGOQrehf1rTqHCz-e2Ljrz9UIAVV-9CwaTIQ05Vyji3sHDITRGOT28HEbJolIJ4vxOc3XKNS2_ieTsd_ldZsFmy7S1e2i6z9JFD7CMT0Ptxb4PLN5SO9c0LMySMybvgzvYgPg2xSp16lX5LEPaujV7xkX-xJEwe5PBxzNHCZ9RJ.jpg",
    "/images/cctv/dome/aR15OIAMnao-N2Ix3CohgQ9EXocqgqQqaEYuCUkgQKMnf46SlCzTUUpGiOdgXfHmwIyC41DbLV6GSIxYm5UUwIWaqfrNK9ivUEJ_cp_NMxakT9w-wVPS-qTC93bYlqCqrKXO5-TqFwx1nn3nnnVTiE-Eix78Bm19TD6iNtDFgdeyMLdWVjP1zTGYKYTKzNJ6.jpg",
    "/images/cctv/dome/r2otC68jlCzyJlZcaKTWDSBYBb77CSEmVzBQvJVhd9xjc-AMcZe64CfmP2Hx033Gg4NNEGF9iH_IBOlbzzn0RYvP3xZnRR9ubPLTdDmyJ_DtSeK9y8uCAB8oYQKDcnwFqSrn-S7mYlQ1hWZh5fJpRehEjCnZfeTPwYLDQCm5a3I_k7H4Q6l7A87yY4OHhhXu.jpg"
  ],
  "Bullet Cameras": [
    "/images/cctv/bullet/5TenuMzbyrJ5zN0UlqJ7rRLKXQYhnM_6tlAF-812He89l4ewjQtYvQz0U2gZmtzIoM6DEV_Gaeq8nlCT8uvXj5FAljDUZ-rQ5YkGEwo6ebOoaRxWLaQcNQ93W5_gFrc0emAiera7qRjYWAA2QgLExxjNhqQAc2YUDddtb9G4wvWKnSd4kuK8n5sQOwy2MUIv.jpg",
    "/images/cctv/bullet/8Dsr3zpELO5_i6Dw3WkGDPB5bvIo2xpl1Y54iXMy-VN1hvn1_TiJ1W5nF7BcFoBitTlE1aBJoCoa9PnINtCq5t2ZMJyqZrx9YxVSg0FO-GjwBo92o17OnCuDkjK0naravjnMq4I1-8v-dj8jUtlb4BM6C7ZmpniwtjnlFBRtuDj8HcotH-N-q-BSomI0CS-R.jpg"
  ],
  "PTZ Cameras": [
    "/images/cctv/ptz/3VZFzDiO72AoHwakoDLGNvHFkLVUgiVmdQducNVhp2laXGUxxuEihWeWCa-dDMGUnVT_4KzH-nq6GoEdOUfhEhtTd0Uw1GJt9KAX4BozyvPncmgmz6YE_TzQrfjNbxXV-HT9CTiX5wZ6GKdIAAwg0fmn0PHaX2GytRGANTYHlXqYsuhCuCNXrSxhmb.jpg",
    "/images/cctv/ptz/3aKrogU_PuxGSGBe-nhUYKXexZtmUjqpXQmT1IVaaKTEKyjTKONcdDQwHBaPSde4YYMnq9dcsxTLd6BWteoJSDZZzG2vun5HpISbA5gg3mwfObCApsrzpV8y45lD9OsFfJuub7YcY9i3BVHZHMkm-awPJIYggJQXyv6AWmBfRR1FpKgwTKXsyhVxXN.jpg"
  ],
  "Turret Cameras": [
    "/images/cctv/turret/SvQC9SamokYa7sTS8d57xE6RX4is0AptxJ0pWwb0wOzmoVwoAI2LVJpHdmDKkU2PGaOk88CNx-qw6KQPH8VTuY-kMrIJhqGAU8LhseFuWWAbCREn3WIqZtlSe09DraRjrzIdCUzG17iu3Vahl1EPzytuUgGX27CgJCnglQ5hPIwkQcXNJmB37jTOJZ.jpg",
    "/images/cctv/turret/U7CLK71NU3s8iXCUDDnwjWFGkKak_GQxcryQm7jSfv5enZ7cOoZ_L1dAXEb2kH7EX3-qlNB8ObfFVrWZFz3kBDc07GTN86pjlknhQl8thZPlVGYg4nc4mXOnhV_lE9JR_ybvw3S47l8CGeI2-inqnFEh3U0To9VLCVbNggk3UxDByi5_a-VdXKwckfXSX.jpg"
  ],
  "Fisheye Cameras": [
    "/images/cctv/fisheye/TS5VM_mHNYm7bXe2lP9oy6g7-5BofDkiQ5COLXuSLCnY4JYiRnmbwRmN26mSEd3Bjuqj9cWWIEP25sIF3zzyDz3Ya9jBW4Dt1YY1WYlHtUk5Rc9rcPrfhx0riX-XOiUo44q49C74HTi7xGLBykUjQ-7E7KN3G-7Y28IdCcePmkDYmg_Zd2dIEmtV5KaqPgR4.jpg",
    "/images/cctv/fisheye/Ush_DdR3vMVmqCf4d1nt4lQAq9hldeHwyTBh6y3zoljh6SeBCVZt5CAaDliqxLBDZMu85moC7GsjKM1MjlwqNkGE_TlVYRs89Iht8-ya3PJz_qSuOjgKPUfwdaZBiYj7Tt4QAhGgb0x6tqzwRqKLYQhtrB_AIndte2Z1hQMDtHhUeGBDDG7ndn2py_PDRmm9.jpg"
  ],
  "Box Cameras": [
    "/images/cctv/box/BKOHaLctffpqc4yN-yDyQsAKOsvFpgeccn3PFGqtjvU7T8bMZRY2-NDm241havjANPwiSa0GKhHPX6EKvdqBR5YIhTS2pbBCyHYdseavlJFJ8ZlKaTFyQ6PoGzIkBERboX5Tc5xLKVvSTc9CUdPdR6Axflm1GEdBrHY18FmPoXjXqAlN3rtaJD91xXzfiJ6-.jpg",
    "/images/cctv/box/Fe1Qq_64vlWphAGvAmJubos5KSpGNf8VbmlyRkA81EAKUFcHzqxiQkO5XzoAfBveYaHanASF-IMDuM4gJaWF6hXkZVpYNqe-9Nx5H0SksElNWX33uJC0meCcitiW110F-CqOHGFn6w_2_nVkq7-j9pTTNGvfZvGYJ6N3K25OVjVaCOX52VhzkqH22oZOcKO4.jpg"
  ],
  "Wireless Cameras": [
    "/images/cctv/wireless/Brvszyepf42s5qZOHOAHslHNpglvdvo9PMoYRQhxYT33PpW20NMHVgGaGTBSKOUtKz58ty5dNdZuQJHOaaKklJk5X1WJjqsgARAmf-haRLtNk5gS52RdDpS7coUbcbhPucAXkXjwgrD6jYeBjgqv2LydGogqPtVIPraHi0WtD454D1rY3I_nUnYkiqYmLpx-.jpg",
    "/images/cctv/wireless/GtV2rqk8eCg7gap3Ik_Ydtw7zlO8SmIACi0w5gOoyYRy2hNtEoDDfd5NV8_EaNk9rr_Cr0j9puxo9pLJ6ErNMwGtMGZpQmtps0HgzleQ9ujnURnEGP3AQDLIBnnQtBaV-zdBnNnyDqo44lHC4_7MW4T4HYGIji2SZZeywiNGeWoFsHG08ct2qQzEXB1vhhCU.jpg"
  ],
  "IP Cameras": [
    "/images/cctv/ip/i3sCq33JbdmOZ_WKVY_ZVmVvM_KdFr5drwXpbzJrhreC1D7inYnwmW6wDB73XHdNCpRthAn-5v8NTBYpbO4KmXOyohfbeDADjURRxU9VSBVhsF42pxC83jIpYdsyXuiGscc2BqNi751r1zHTL697vWtU5VnYnU2s2bU-9ZMbi6evj0zghqBocsmQxnzYtZHR.jpg",
    "/images/cctv/ip/ljuNi5WadXxd3D-LTgoUo9BSJ5ctJdjNFlMjG8xkzfi1fU2dN3OC6g792UfozN-QLYWgw3r7fzrCYnLs2KlqdlkQz_VKl5YrGGdrAMr_oj0svf-zAbzVaUCKiAcab_aeSPv5DXCJrvEjvHcoPn0awsq5cmy5UNBtDy9a4KdATsW1K8e8t8xGctd7T2fcdIph.jpg"
  ],

  // Fire Safety Equipment
  "Fire Alarm Control Panel": [
    "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-41gyjfrk.jpg",
    "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-5gpw193z.jpg"
  ],
  "Smoke Detectors": [
    "/images/services/fire-alarm/smoke-detector/img-4soj8cqs.jpg",
    "/images/services/fire-alarm/smoke-detector/img-bhq2vety.jpg"
  ],
  "Heat Detectors": [
    "/images/services/fire-alarm/heat-detector/img-empzt0kh.jpg",
    "/images/services/fire-alarm/heat-detector/img-ersyneux.jpg"
  ],
  "Flame Detectors": [
    "/images/services/fire-alarm/flame-detector/img-0z408d2t.jpg",
    "/images/services/fire-alarm/flame-detector/img-9dwugq0j.jpg"
  ],
  "Beam Smoke Detector": [
    "/images/services/fire-alarm/beam-smoke-detector/img-66ftinii.jpg",
    "/images/services/fire-alarm/beam-smoke-detector/img-cawgt6ke.jpg"
  ],
  "Emergency Exit Signs": [
    "/images/services/fire-alarm/emergency-exit-sign/img-0aryxuoh.jpg",
    "/images/services/fire-alarm/emergency-exit-sign/img-60h93n9j.jpg"
  ],
  "Emergency Lights": [
    "/images/services/fire-alarm/emergency-light/img-3i14ar2g.jpg",
    "/images/services/fire-alarm/emergency-light/img-cyxj4mh7.jpg"
  ],
  "Fire Extinguishers": [
    "/images/services/fire-alarm/fire-extinguisher/img-cd8qwitk.jpg",
    "/images/services/fire-alarm/fire-extinguisher/img-ik5yha5h.jpg"
  ],
  "Fire Sprinkler System": [
    "/images/services/fire-alarm/fire-sprinkler-system/img-ehndt9ph.jpg",
    "/images/services/fire-alarm/fire-sprinkler-system/img-eslesg89.jpg"
  ],
  "Fire Hydrant System": [
    "/images/services/fire-alarm/fire-hydrant-system/img-2ya0vqyi.jpg",
    "/images/services/fire-alarm/fire-hydrant-system/img-gpw6n0xl.jpg"
  ],
  "FM-200 System": [
    "/images/services/fire-alarm/fm-200-fire-suppression-system/img-8emira6q.jpg",
    "/images/services/fire-alarm/fm-200-fire-suppression-system/img-k2nr9vht.jpg"
  ],

  // Access Control Equipment
  "Biometric Fingerprint Reader": [
    "/images/services/access-control/biometric-fingerprint-reader/img-7yp7vslh.jpg",
    "/images/services/access-control/biometric-fingerprint-reader/img-bkmdwe3r.jpg"
  ],
  "Facial Recognition Terminal": [
    "/images/services/access-control/facial-recognition-terminal/img-8gta2svs.jpg",
    "/images/services/access-control/facial-recognition-terminal/img-9ui2qmn2.jpg"
  ],
  "RFID Card Reader": [
    "/images/services/access-control/rfid-card-reader/img-7pp9r2b0.jpg",
    "/images/services/access-control/rfid-card-reader/img-phvquhjz.jpg"
  ],
  "Keypad Access Control": [
    "/images/services/access-control/keypad-access-control/img-mrjk6rat.jpg",
    "/images/services/access-control/keypad-access-control/img-uak61dl1.jpg"
  ],
  "Smart Door Lock": [
    "/images/services/access-control/smart-door-lock/img-hhd2fcx6.jpg",
    "/images/services/access-control/smart-door-lock/img-rexrg6qb.jpg"
  ],
  "Electromagnetic Lock (Maglock)": [
    "/images/services/access-control/electromagnetic-lock-maglock/img-sya1h93d.jpg",
    "/images/services/access-control/electromagnetic-lock-maglock/img-xf2p23z2.jpg"
  ],
  "Electric Bolt Lock": [
    "/images/services/access-control/electric-bolt-lock/img-bxxbrn4m.jpg",
    "/images/services/access-control/electric-bolt-lock/img-v1tnsaaz.jpg"
  ],
  "Electric Strike Lock": [
    "/images/services/access-control/electric-strike-lock/img-bpvjxswg.jpg",
    "/images/services/access-control/electric-strike-lock/img-d813e77i.jpg"
  ],
  "Access Control Controller": [
    "/images/services/access-control/access-control-controller/img-1uy66gux.jpg",
    "/images/services/access-control/access-control-controller/img-gq7fpc50.jpg"
  ],
  "Exit Push Button": [
    "/images/services/access-control/exit-push-button/img-425b0u2h.jpg",
    "/images/services/access-control/exit-push-button/img-cnxvcik7.jpg"
  ],
  "Exit Motion Sensor": [
    "/images/services/access-control/exit-motion-sensor/img-j8g3i1ou.jpg",
    "/images/services/access-control/exit-motion-sensor/img-qjuqrola.jpg"
  ],
  "Door Exit Release Button": [
    "/images/services/access-control/door-exit-release-button/img-4tsn27pa.jpg",
    "/images/services/access-control/door-exit-release-button/img-unjw6ose.jpg"
  ],
  "Boom Barrier": [
    "/images/services/access-control/boom-barrier/img-azeb8r5k.jpg",
    "/images/services/access-control/boom-barrier/img-h4wiwmwp.jpg"
  ],
  "Video Door Phone (VDP)": [
    "/images/services/access-control/video-door-phone-vdp/img-0xtgtvic.jpg",
    "/images/services/access-control/video-door-phone-vdp/img-9uu3gur7.jpg"
  ],

  // PA System Equipment
  "PA System Amplifier": [
    "/images/services/pa-system/pa-system-amplifier/img-43bln0p3.jpg",
    "/images/services/pa-system/pa-system-amplifier/img-i0d6mrex.jpg"
  ],
  "Ceiling Speaker": [
    "/images/services/pa-system/ceiling-speaker/img-avkv7ivs.jpg",
    "/images/services/pa-system/ceiling-speaker/img-lr7ewign.jpg"
  ],
  "Wall Mount Speaker": [
    "/images/services/pa-system/wall-mount-speaker/img-acyt9i6l.jpg",
    "/images/services/pa-system/wall-mount-speaker/img-uh1z6nku.jpg"
  ],
  "Horn Speaker": [
    "/images/services/pa-system/horn-speaker/img-8g9t83g3.jpg",
    "/images/services/pa-system/horn-speaker/img-ekqzqnle.jpg"
  ],
  "Column Speaker": [
    "/images/services/pa-system/column-speaker/img-izc93tf7.jpg",
    "/images/services/pa-system/column-speaker/img-s2w1gf1f.jpg"
  ],
  "Paging Microphone": [
    "/images/services/pa-system/paging-microphone/img-7bgfz11d.jpg",
    "/images/services/pa-system/paging-microphone/img-z6da1vz6.jpg"
  ],
  "Wireless Microphone": [
    "/images/services/pa-system/wireless-microphone/img-4gftnrvq.jpg",
    "/images/services/pa-system/wireless-microphone/img-gavfmjx1.jpg"
  ],
  "Audio Mixer": [
    "/images/services/pa-system/audio-mixer/img-3j0ngnza.jpg",
    "/images/services/pa-system/audio-mixer/img-y76chrrz.jpg"
  ],
  "Zone Controller": [
    "/images/services/pa-system/zone-controller/img-51dztxol.jpg",
    "/images/services/pa-system/zone-controller/img-qqsx4dbe.jpg"
  ],
  "PA System Controller": [
    "/images/services/pa-system/pa-system-controller/img-kwugwbmc.jpg",
    "/images/services/pa-system/pa-system-controller/img-qoteph1h.jpg"
  ],
  "Network Audio Controller": [
    "/images/services/pa-system/network-audio-controller/img-hl0gt0ig.jpg",
    "/images/services/pa-system/network-audio-controller/img-th46dda6.jpg"
  ],
  "Rack Cabinet": [
    "/images/services/pa-system/rack-cabinet/img-2yjii6qa.jpg",
    "/images/services/pa-system/rack-cabinet/img-r8m1hy97.jpg"
  ],
  "Power Supply Unit (PSU)": [
    "/images/services/pa-system/power-supply-unit-psu/img-1wwq7yib.jpg",
    "/images/services/pa-system/power-supply-unit-psu/img-93ib1fqo.jpg"
  ],
  "Emergency Voice Evacuation System (EVAC)": [
    "/images/services/pa-system/emergency-voice-evacuation-system-evac/img-1qhyd12o.jpg",
    "/images/services/pa-system/emergency-voice-evacuation-system-evac/img-31eb2qi2.jpg"
  ],
  "Network IP Speaker": [
    "/images/services/pa-system/network-ip-speaker/img-fdjhmlum.jpg",
    "/images/services/pa-system/network-ip-speaker/img-kfnxl94y.jpg"
  ],
  "Volume Controller": [
    "/images/services/pa-system/volume-controller/img-cnc7w59b.jpg",
    "/images/services/pa-system/volume-controller/img-djleys61.jpg"
  ]
};

// Admin Card Image Slider Component
function AdminCardSlider({ primaryImage, dbImages, itemTitle }: { primaryImage?: string; dbImages?: string[]; itemTitle: string }) {
  const catalogImages = CATEGORY_SLIDER_IMAGES[itemTitle] || [];
  let images: string[] = [];

  if (primaryImage) {
    images.push(primaryImage);
  }

  if (dbImages && Array.isArray(dbImages)) {
    dbImages.forEach((img) => {
      if (!images.includes(img)) images.push(img);
    });
  }

  if (images.length === 0 && catalogImages.length > 0) {
    images = catalogImages;
  }

  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div className="h-56 bg-slate-950 flex items-center justify-center">
        <Cpu className="w-16 h-16 text-slate-700" />
      </div>
    );
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-56 bg-slate-950 relative overflow-hidden flex items-center justify-center p-4 group/slider">
      <img
        src={getMediaUrl(images[current])}
        alt={`${itemTitle} - ${current + 1}`}
        className="max-h-full max-w-full object-contain group-hover/slider:scale-105 transition-transform duration-500"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 shadow-lg z-20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 shadow-lg z-20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/70 px-2 py-1 rounded-full z-20">
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(idx);
                }}
                className={`h-1.5 rounded-full cursor-pointer transition-all ${
                  current === idx ? "w-4 bg-[#38BDF8]" : "w-1.5 bg-slate-500"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const DEFAULT_CATEGORIES = [
  "Security Guard Services",
  "CCTV Surveillance",
  "Access Control",
  "Fire Safety",
  "PA System",
  "Housekeeping & Facility Management Services"
];

export default function AdminServiceCategoriesPage() {
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Dynamic services for dropdowns
  const [servicesList, setServicesList] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    servicesApi.getServices({ status: "active", limit: 50 })
      .then((res: any) => {
        const list = res?.data?.services ?? res?.data ?? [];
        if (Array.isArray(list) && list.length > 0) {
          const sorted = [...list].sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
          setServicesList(sorted.map((s: any) => ({ title: s.title, slug: s.slug })));
          // Initialize form defaults to first service
          if (!serviceSlug && sorted.length > 0) {
            setServiceSlug(sorted[0].slug);
            setDeviceCategory(sorted[0].title);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DeviceItem | null>(null);
  const [formLoading, setFormLoading] = useState(false);

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

  // Delete Modal
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [deviceCategory, setDeviceCategory] = useState("CCTV Surveillance");
  const [serviceSlug, setServiceSlug] = useState("cctv-installation");
  const [description, setDescription] = useState("");
  const [bestForInput, setBestForInput] = useState("");
  const [keyFeaturesInput, setKeyFeaturesInput] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const res = await devicesApi.getDevices({ search, category, limit: 100 });
      if (res.success && res.data) {
        setDevices(res.data.devices);

        // Dynamically update allCategories while preserving defaults
        if (Array.isArray(res.data.devices)) {
          const fetchedCats = res.data.devices.map((d: DeviceItem) => d.category).filter(Boolean);
          setAllCategories((prev) => {
            const combined = Array.from(new Set([...prev, ...fetchedCats]));
            return combined;
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch service categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDevices();
  }, [search, category]);

  // Lock body scroll and handle keyboard scrolling for modal dialog
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflowHtml = document.documentElement.style.overflow;
    const originalOverflowBody = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      modalScrollRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT";

      if (e.key === "Escape") {
        setIsModalOpen(false);
        return;
      }

      if (!isTyping && modalScrollRef.current) {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          const amount = e.key === "PageDown" ? 400 : (e.key === " " ? 300 : 150);
          modalScrollRef.current.scrollBy({ top: amount, behavior: "smooth" });
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault();
          const amount = e.key === "PageUp" ? -400 : -150;
          modalScrollRef.current.scrollBy({ top: amount, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = originalOverflowHtml;
      document.body.style.overflow = originalOverflowBody;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleOpenModal = (item?: DeviceItem) => {
    if (item) {
      setEditingItem(item);
      setName(item.name);
      setDeviceCategory(item.category);
      setServiceSlug(item.serviceSlug || "cctv-installation");
      setDescription(item.description || "");
      setBestForInput(Array.isArray(item.bestFor) ? item.bestFor.join(", ") : "");
      setKeyFeaturesInput(Array.isArray(item.keyFeatures) ? item.keyFeatures.join(", ") : "");
      setStatus(item.status);

      const modalImgs = (item.images && Array.isArray(item.images) && item.images.length > 0)
        ? item.images
        : (CATEGORY_SLIDER_IMAGES[item.name] || (item.imagePath ? [item.imagePath] : []));
      setExistingImages(modalImgs);
    } else {
      setEditingItem(null);
      setName("");
      setDeviceCategory("CCTV Surveillance");
      setServiceSlug("cctv-installation");
      setDescription("");
      setBestForInput("");
      setKeyFeaturesInput("");
      setStatus("active");
      setExistingImages([]);
    }
    setImageFiles([]);
    setIsModalOpen(true);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveNewImage = (indexToRemove: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", deviceCategory);
      formData.append("serviceSlug", serviceSlug);
      formData.append("description", description);
      formData.append("bestFor", bestForInput);
      formData.append("keyFeatures", keyFeaturesInput);
      formData.append("status", status);
      formData.append("existingImages", JSON.stringify(existingImages));

      const compressedImages = await compressMultipleImages(imageFiles);
      compressedImages.forEach((file) => {
        formData.append("imageFiles", file);
      });

      if (editingItem) {
        await devicesApi.updateDevice(editingItem.id, formData);
      } else {
        await devicesApi.createDevice(formData);
      }

      setIsModalOpen(false);
      fetchDevices();
    } catch (error: any) {
      console.error("Save category error:", error);
      const serverMsg = error?.response?.data?.message || error?.message || "Failed to save service category details.";
      alert(`Save Failed: ${serverMsg}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await devicesApi.deleteDevice(deleteId);
      setDeleteId(null);
      fetchDevices();
    } catch (error) {
      alert("Failed to delete category item.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bebas tracking-wide text-white">Service Categories & Hardware Specs</h1>
          <p className="text-slate-400 text-sm">Manage sub-service categories, camera types, guard deployments, biometric hardware, and equipment specs.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white text-sm font-semibold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category / Device</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service categories..."
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
            {allCategories.map((catName) => (
              <option key={catName} value={catName}>
                {catName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            Loading service categories...
          </div>
        ) : devices.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            No service categories or devices found in catalog.
          </div>
        ) : (
          devices.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-all">
              <div>
                {/* Multi-Image Slider for Card */}
                <div className="relative z-0">
                  <AdminCardSlider primaryImage={item.imagePath} dbImages={item.images} itemTitle={item.name} />

                  <span className="absolute top-3 left-3 z-10 bg-[#0284C7] text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Card Body - FULL CONTENT UN-TRUNCATED */}
                <div className="p-5 space-y-4">
                  <h3 className="text-xl font-bebas tracking-wide text-white">{item.name}</h3>

                  {/* Full Un-clamped Description */}
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description || "No description provided."}</p>

                  {/* Complete Best For Tags */}
                  {Array.isArray(item.bestFor) && item.bestFor.length > 0 && (
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1.5">Best For:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.bestFor.map((tag, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Complete Key Features & Duties */}
                  {Array.isArray(item.keyFeatures) && item.keyFeatures.length > 0 && (
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1.5">Key Features & Duties:</span>
                      <ul className="text-xs text-slate-300 space-y-1.5">
                        {item.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-800/60 flex items-center justify-between mt-4">
                <span className="text-xs text-slate-500 font-mono">{item.serviceSlug || "general"}</span>
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
            
            {/* Fixed Header */}
            <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900 z-10">
              <div>
                <h2 className="text-3xl font-bebas tracking-wide text-white">
                  {editingItem ? "Edit Service Category / Device" : "Add New Service Category"}
                </h2>
                <p className="text-xs text-slate-400">Manage hardware specifications, category details, and image gallery collection.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
              
              {/* Scrollable Form Body with Custom Scrollbar */}
              <div 
                ref={modalScrollRef} 
                tabIndex={-1} 
                className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1 focus:outline-none [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-slate-950/80 [&::-webkit-scrollbar-thumb]:bg-[#0284C7] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#38BDF8]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Industrial Security Guards or Dome Cameras"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Parent Service *</label>
                    <select
                      value={deviceCategory}
                      onChange={(e) => setDeviceCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                    >
                      {servicesList.length > 0
                        ? servicesList.map((svc) => (
                            <option key={svc.slug} value={svc.title}>{svc.title}</option>
                          ))
                        : (
                          <>
                            <option value="Security Guard Services">Security Guard Services</option>
                            <option value="CCTV Surveillance">CCTV Surveillance</option>
                            <option value="Access Control">Access Control</option>
                            <option value="Fire Safety">Fire Safety</option>
                            <option value="PA System">PA System</option>
                          </>
                        )
                      }
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Associated Service Page</label>
                  <select
                    value={serviceSlug}
                    onChange={(e) => setServiceSlug(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  >
                    {servicesList.length > 0
                      ? servicesList.map((svc) => (
                          <option key={svc.slug} value={svc.slug}>{svc.title}</option>
                        ))
                      : (
                        <>
                          <option value="security-guard-services">Security Guard Services</option>
                          <option value="cctv-installation">CCTV Installation &amp; Live Surveillance</option>
                          <option value="fire-alarm-system">Fire Alarm &amp; Detection Systems</option>
                          <option value="access-control-system">Access Control Systems</option>
                          <option value="public-address-system">Public Address (PA) Systems</option>
                        </>
                      )
                    }
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                    >
                      <option value="active">Active (Visible on Website)</option>
                      <option value="inactive">Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Detailed Category Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the category, services provided, personnel training, or hardware specs..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Best For (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="Gated Societies, Corporate IT Parks, Factories"
                      value={bestForInput}
                      onChange={(e) => setBestForInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Features & Duties (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="24/7 Gate Supervision, Access Register Management, Fire Safety Trained"
                      value={keyFeaturesInput}
                      onChange={(e) => setKeyFeaturesInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                {/* Category Images Gallery Preview */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Category Images Gallery ({existingImages.length} Images Saved)
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">Hover to view or click 🗑️ to remove photo</span>
                  </div>

                  {existingImages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      {existingImages.map((imgUrl, idx) => (
                        <div key={idx} className="group relative aspect-square bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center p-2 shadow-lg">
                          <img
                            src={getMediaUrl(imgUrl)}
                            alt={`Category image ${idx + 1}`}
                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Remove this image"
                            className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="absolute bottom-2 right-2 bg-slate-900/90 text-[#38BDF8] font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-800">
                            #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                      No images saved for this category yet.
                    </p>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Upload New Images (Select One or Multiple Photos)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const newFiles = Array.from(e.target.files);
                          setImageFiles((prev) => [...prev, ...newFiles]);
                        }
                      }}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0284C7] file:text-white cursor-pointer"
                    />

                    {imageFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <span className="text-xs text-[#38BDF8] font-semibold block">
                          {imageFiles.length} New Image{imageFiles.length > 1 ? "s" : ""} Selected to Upload:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                          {imageFiles.map((file, idx) => {
                            const previewUrl = URL.createObjectURL(file);
                            return (
                              <div key={idx} className="group relative aspect-square bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center p-2 shadow-lg">
                                <img
                                  src={previewUrl}
                                  alt={`New photo preview ${file.name}`}
                                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveNewImage(idx)}
                                  title="Remove this new photo"
                                  className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <span className="absolute bottom-2 left-2 bg-emerald-500/90 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                                  NEW
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="p-4 md:p-6 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0 bg-slate-900 z-10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#0284C7] hover:bg-[#0369a1] text-white shadow-lg transition-all"
                >
                  {formLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />}
                  Save Category
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
        title="Delete Service Category"
        description="Are you sure you want to delete this service category from catalog?"
        loading={deleteLoading}
      />
    </div>
  );
}
