"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Cctv, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Sliders, 
  Cpu, 
  Award, 
  Wrench, 
  Headset, 
  Eye, 
  Building2, 
  Home, 
  Factory, 
  GraduationCap, 
  HeartPulse, 
  Warehouse, 
  Landmark, 
  Hotel, 
  HelpCircle, 
  ChevronDown, 
  Send, 
  Sparkles, 
  Wifi, 
  Lock, 
  FileText, 
  Zap, 
  Video 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMediaUrl } from "@/lib/axios";
import { devicesApi } from "@/services/api/devicesApi";
import { settingsApi } from "@/services/api/settingsApi";

// 1. Key Benefits
const KEY_BENEFITS = [
  "HD & 4K Ultra HD Video Quality",
  "24×7 Continuous Monitoring",
  "AI-Powered Video Analytics",
  "Mobile Remote Viewing",
  "Motion Detection Alerts",
  "Night Vision Surveillance",
  "Cloud & Local Storage",
  "Professional Installation",
  "Annual Maintenance Contracts",
  "24×7 Technical Support"
];

// Local Public Image Folders for each Camera Category
const CAMERA_CATEGORY_IMAGES: Record<string, string[]> = {
  "Dome Cameras": [
    "/images/cctv/dome/VP26P-T89uJ-K4JLfuW_mCGOQrehf1rTqHCz-e2Ljrz9UIAVV-9CwaTIQ05Vyji3sHDITRGOT28HEbJolIJ4vxOc3XKNS2_ieTsd_ldZsFmy7S1e2i6z9JFD7CMT0Ptxb4PLN5SO9c0LMySMybvgzvYgPg2xSp16lX5LEPaujV7xkX-xJEwe5PBxzNHCZ9RJ.jpg",
    "/images/cctv/dome/aR15OIAMnao-N2Ix3CohgQ9EXocqgqQqaEYuCUkgQKMnf46SlCzTUUpGiOdgXfHmwIyC41DbLV6GSIxYm5UUwIWaqfrNK9ivUEJ_cp_NMxakT9w-wVPS-qTC93bYlqCqrKXO5-TqFwx1nn3nnnVTiE-Eix78Bm19TD6iNtDFgdeyMLdWVjP1zTGYKYTKzNJ6.jpg",
    "/images/cctv/dome/r2otC68jlCzyJlZcaKTWDSBYBb77CSEmVzBQvJVhd9xjc-AMcZe64CfmP2Hx033Gg4NNEGF9iH_IBOlbzzn0RYvP3xZnRR9ubPLTdDmyJ_DtSeK9y8uCAB8oYQKDcnwFqSrn-S7mYlQ1hWZh5fJpRehEjCnZfeTPwYLDQCm5a3I_k7H4Q6l7A87yY4OHhhXu.jpg",
    "/images/cctv/dome/u425wWqjSne5ZRNEsNTVsdL5WJaDU_T7fbtTlVAwrN8qZyxU2ZLWKzTl0AKHA97uqNlw21lM2tnsSfPzBLSevLsAIVTyNbM9xaTNJ7RZsu2nNXmctv424r5V_oEddPxGW5QEamd8pT1bvSMLaTf33eE2n8JpnlCIZ2pmSPbYvzmCsfe27Vo-cigWgHIljqk4.jpg",
    "/images/cctv/dome/yazGO60BVUnAjl4kRWiQTlbdEKm0PTYoPZ6VPY9I2ZDOeJdhaTmIwMbdeC3WM0VqF_v4D154an8fFs-j2Ar8scBDKAhOvOU6ZJR8tY78EHQbo7-EkwimgEhYv7dWlNK2Lh6jMzhvW6kEJt4jTQUZZK9YS4SnJgl-s1TtM8gm0EKH9o_Q2q20hADEpAG0oO4x.jpg"
  ],
  "Bullet Cameras": [
    "/images/cctv/bullet/5TenuMzbyrJ5zN0UlqJ7rRLKXQYhnM_6tlAF-812He89l4ewjQtYvQz0U2gZmtzIoM6DEV_Gaeq8nlCT8uvXj5FAljDUZ-rQ5YkGEwo6ebOoaRxWLaQcNQ93W5_gFrc0emAiera7qRjYWAA2QgLExxjNhqQAc2YUDddtb9G4wvWKnSd4kuK8n5sQOwy2MUIv.jpg",
    "/images/cctv/bullet/8Dsr3zpELO5_i6Dw3WkGDPB5bvIo2xpl1Y54iXMy-VN1hvn1_TiJ1W5nF7BcFoBitTlE1aBJoCoa9PnINtCq5t2ZMJyqZrx9YxVSg0FO-GjwBo92o17OnCuDkjK0naravjnMq4I1-8v-dj8jUtlb4BM6C7ZmpniwtjnlFBRtuDj8HcotH-N-q-BSomI0CS-R.jpg",
    "/images/cctv/bullet/WVwAQYS267VdbxX6poLVDsWS-5wZersfIee2Q-E8F4X6XstePNf_oH5eXXRA9pG9YdnNmSTYi_FRyQUJQfRaAXlwfUUDc9zbwS7WjjmJx6_hM7XCQUILoy78lSqSbYCvhWyem7iKSGIjSrUqlMVNA3qaNFRq1JwN0V5QFGT8ULNEU5kvrXy6OUKG1Kc2FQv9.jpg",
    "/images/cctv/bullet/gERS6kDtIEpWLTZbvFwtzXVANjfIFGTs7vVBiByGu-AnVWyPKk6gHwNFcEXn51otLr3CLTTVdg3LFPix8Ujo46MbYt4jMKaar7Arzmsvo4QxXcaTKWOO6TY0XVEBqizGZpAkre_eDRntbWwe1w-WsM1NPW4SxbZqDN0T96lSi-8xshOvxDEvh8KlxJC6pS2d.jpg",
    "/images/cctv/bullet/uwSCd8QVwVhd9r0HubtcO-_3qCSxv0geQdsx93t_ZlGVm8A2FG_UhY8WAbYWIAURL2fgitbSNUWc5TF0OmqvVX4v6bGvFrGxEwPRBvOFHxsP48GyKxWDJMVCY9nXvm61yju_qKlt8EWuhmhvL2ka_7kC2ALh_l9slrT3qFQmeGw7yX4Sj85sIHASREXQ7-dY.jpg"
  ],
  "PTZ Cameras": [
    "/images/cctv/ptz/3VZFzDiO72AoHwakoDLGNvHFkLVUgiVmdQducNVhp2laXGUxxuEihWeWCa-dDMGUnVT_4KzH-nq6GoEdOUfhEhtTd0Uw1GJt9KAX4BozyvPncmgmz6YE_TzQrfjNbxXV-HT9CTiX5wZ6GKdIAAwg0fmn0PHaX2GytRGANTYHlXqYsuhCuCNXrSxhmb.jpg",
    "/images/cctv/ptz/3aKrogU_PuxGSGBe-nhUYKXexZtmUjqpXQmT1IVaaKTEKyjTKONcdDQwHBaPSde4YYMnq9dcsxTLd6BWteoJSDZZzG2vun5HpISbA5gg3mwfObCApsrzpV8y45lD9OsFfJuub7YcY9i3BVHZHMkm-awPJIYggJQXyv6AWmBfRR1FpKgwTKXsyhVxXN.jpg",
    "/images/cctv/ptz/Vlz-EAnASOVOJ2jEVJn58a3VRhJrMprpxgl4kHw_i9m5hk8fcGwojFXsx2gdTqCRM4VQRmVBuVkTefVoPkoaS8cGkOUzyt7fwoJyrhXT0Ed0C3egDvT7r7I25TP4gYD8ZX6ZVgtslJb0WiJhWLv60xsP2CCWsIBDs7hnXHsTRym--katr4eF72026k.jpg",
    "/images/cctv/ptz/kGRg3Y3qN8RHUOoTSBtoi7rt48JsuRKBfr2sS0ML7cyZZ8vaI-zJ1eiNAvfrQhe3tkbqdWo9YKgsW_lE8kBoQVKw0ep8j_BQWlJrZMxJCAZJ4JtPtkcqqRmS1_DytZ24dbDvIRmV5wAme_LEs4M-Ma3SjdjTBs8mnvjRx0xRfeaOYfoDvRH8LnzNVWu1UL0j.jpg",
    "/images/cctv/ptz/y_GgxYVbmaptYukD-_fiZr0ij4ju7gWRixD8062BGBeSnXqlm1TdFUcWXsezFx55ejKVw7L8rmpArqqJ7sOJwhq4Z6ZHe4a4U4isaLcS8-4DffR-cM_XxIzY9ApbozVWfAZFdDc2RjmnOnBW_ASM0FrygMgQE2Yp3m2RI_f0tMM3w9z4YZbEjyo0S5.jpg"
  ],
  "Turret Cameras": [
    "/images/cctv/turret/SvQC9SamokYa7sTS8d57xE6RX4is0AptxJ0pWwb0wOzmoVwoAI2LVJpHdmDKkU2PGaOk88CNx-qw6KQPH8VTuY-kMrIJhqGAU8LhseFuWWAbCREn3WIqZtlSe09DraRjrzIdCUzG17iu3Vahl1EPzytuUgGX27CgJCnglQ5hPIwkQcXNJmB37jTOJZ.jpg",
    "/images/cctv/turret/U7CLK71NU3s8iXCUDDnwjWFGkKak_GQxcryQm7jSfv5enZ7cOoZ_L1dAXEb2kH7EX3-qlNB8ObfFVrWZFz3kBDc07GTN86pjlknhQl8thZPlVGYg4nc4mXOnhV_lE9JR_ybvw3S47l8CGeI2-inqnFEh3U0To9VLCVbNggk3UxDByi5_a-VdXKwckfXSX.jpg",
    "/images/cctv/turret/gGjAcNIKP5mGBsGZDwy8cXa_Uynju4lOmHJ7bHisirAOW7sWB29pOLgq7c5IkjYlP3vL2LHxOR1wUv7hu-gX7s0vC6g3mMNcU7cOjA6kbcCuXUtsOek-HKtzWmvloh6Ge3hiRHr97iHoQHILi9TLcqaqTcg2S_heet8wOYiPwtCOzhC8DNAn-rR7rB91N.jpg",
    "/images/cctv/turret/zomthuEcnAtbvrZyj2gAps93rBL-s5Y7suyO6ULTpLkplK9gExQmuOovY0abDCfGZJbMly8cj-Aq45BB6TBFL0OjMdc4wRWWI-uz7y-LEJmW0T1kA3KtqPz554o5UtykcFDYTlsm3Nu8UKaxEAWEY5MddLEFwbzolh2Hio-5oUKTqiPKtgM59ZyzZZ.jpg"
  ],
  "Fisheye Cameras": [
    "/images/cctv/fisheye/TS5VM_mHNYm7bXe2lP9oy6g7-5BofDkiQ5COLXuSLCnY4JYiRnmbwRmN26mSEd3Bjuqj9cWWIEP25sIF3zzyDz3Ya9jBW4Dt1YY1WYlHtUk5Rc9rcPrfhx0riX-XOiUo44q49C74HTi7xGLBykUjQ-7E7KN3G-7Y28IdCcePmkDYmg_Zd2dIEmtV5KaqPgR4.jpg",
    "/images/cctv/fisheye/Ush_DdR3vMVmqCf4d1nt4lQAq9hldeHwyTBh6y3zoljh6SeBCVZt5CAaDliqxLBDZMu85moC7GsjKM1MjlwqNkGE_TlVYRs89Iht8-ya3PJz_qSuOjgKPUfwdaZBiYj7Tt4QAhGgb0x6tqzwRqKLYQhtrB_AIndte2Z1hQMDtHhUeGBDDG7ndn2py_PDRmm9.jpg",
    "/images/cctv/fisheye/VAYub-eOhJs5N8ATraYUGn9FQBpD94fA-kS3rRsKNvN0KqeRg7n1ZRxA-i11UXnwuTEVucHrcTr4cEtuVhbuCjZEvbCzP4etH3FuKDi2D-xoQEdO5E_Zy8xXDW8yUKVn-hT17dEWFZdk6xVhy2ZdQPAbyC9qdNd1_BSv2mYSa0EBUvNARsyuLlzN-1qtF-Gu.jpg",
    "/images/cctv/fisheye/ZrmFPIZoLwpSWEr4FyWsm8iOQNccdX-WKM1pPhMo0lkLayknqR7kN5FpFuaLGzs29AFlcD7O15O1bCtxkjFGKNS_pKXJj8e2XjI9ve4krtF3h_CJnmxJVg3U3jzF9qHqsX1nWwo-GOHrz5UDOlblQOpG6Y32w1EdVY5dqSVWNa9EmCbisPq8GRQGA-OvhYzx.jpg",
    "/images/cctv/fisheye/cS-cxt216oQbboxKWdRO3CaqXN0OSftBnU0AkCC-Z75V_EO7CeG6dh4YbfkjR8ZVYzaydSIeZIHAprU2lBS7OPPdLOmigOIuJ2IAY5SsaBzK7pYAOV8SRzSA0VQjTF77z1sLSj1uzUZH12uPh8dOVUJVApPwZ5GL2MKVsyKHiNI8bzKvS2qheytMvEmp2.jpg"
  ],
  "Box Cameras": [
    "/images/cctv/box/BKOHaLctffpqc4yN-yDyQsAKOsvFpgeccn3PFGqtjvU7T8bMZRY2-NDm241havjANPwiSa0GKhHPX6EKvdqBR5YIhTS2pbBCyHYdseavlJFJ8ZlKaTFyQ6PoGzIkBERboX5Tc5xLKVvSTc9CUdPdR6Axflm1GEdBrHY18FmPoXjXqAlN3rtaJD91xXzfiJ6-.jpg",
    "/images/cctv/box/Fe1Qq_64vlWphAGvAmJubos5KSpGNf8VbmlyRkA81EAKUFcHzqxiQkO5XzoAfBveYaHanASF-IMDuM4gJaWF6hXkZVpYNqe-9Nx5H0SksElNWX33uJC0meCcitiW110F-CqOHGFn6w_2_nVkq7-j9pTTNGvfZvGYJ6N3K25OVjVaCOX52VhzkqH22oZOcKO4.jpg",
    "/images/cctv/box/JPEhOYfK6fHOyjL0jkF40iMSvmtI0CWHPWf-Ku6iZ0UY_HOMOD2XP13YvAqV5m44vT2ndC16u3GdxK4Kdw3qM6IaVCYjp_NLpxAY9-cc-hC7fvC-QdFJpfol183KvhEGScq6Hao98NrAz4snJgmMqUnqkuPN87ePyP7GR77adjPsOxw8H1Exeg7W5IpDs3kK.jpg",
    "/images/cctv/box/lZtWWRUYQ0sR3qRZ_swqYavFUDFv-P1hUpu0ZuYBcDVvMTESHyTCzd9wjUFV-VE_czqqgH0LYgsjfOBxYp1Ebo9ouAQsMCE0Cy__0t0y740NXFj0mFd1WsgXOUEFuKXBMfiXeg7O_V7ZTta3ZHtvCyxL8AaQcXjnt9s3YsocOli8PZ2V_Dpj1DHQcbuL9fCJ.jpg",
    "/images/cctv/box/o3Yg42Bb1TMnSRcDSjgHy26hmhh6I1SaS_ltVekvy6gb41oHqxzxvfu-Kuq3ASpVaMvM47FUG3ZWtj18ilNMvd3m3UhiWa13Dp4hoIk4wCVfW6b56XMNb62C05FXJqTuycz7CZdtpUAHDaCl__mld3Y_wL6Fmfvr0EQauIOnPu5C5bTl4rQpXUJ9nr_latC8.jpg"
  ],
  "Wireless Cameras": [
    "/images/cctv/wireless/Brvszyepf42s5qZOHOAHslHNpglvdvo9PMoYRQhxYT33PpW20NMHVgGaGTBSKOUtKz58ty5dNdZuQJHOaaKklJk5X1WJjqsgARAmf-haRLtNk5gS52RdDpS7coUbcbhPucAXkXjwgrD6jYeBjgqv2LydGogqPtVIPraHi0WtD454D1rY3I_nUnYkiqYmLpx-.jpg",
    "/images/cctv/wireless/GtV2rqk8eCg7gap3Ik_Ydtw7zlO8SmIACi0w5gOoyYRy2hNtEoDDfd5NV8_EaNk9rr_Cr0j9puxo9pLJ6ErNMwGtMGZpQmtps0HgzleQ9ujnURnEGP3AQDLIBnnQtBaV-zdBnNnyDqo44lHC4_7MW4T4HYGIji2SZZeywiNGeWoFsHG08ct2qQzEXB1vhhCU.jpg",
    "/images/cctv/wireless/KdKDlWd9xDy75EjP9ac8ZA6qbG8A_E2MgXY60gowRmfGy9b36B4kfqirzwjXYsrIr0oMnugr9JTOgDDuA9zIGwX8MNcv87NzqfZdA8t1amsC8tl1G7TlyTNgSd5nA60_KR0WL2RKjftNE6suVwN3jorer4ZACZ7SG5yHM2YO7YXUWxXLftzZ6AkrpbU0e02A.jpg",
    "/images/cctv/wireless/ZTQnv5nJPjvy42Gmopat1Ij2jGdtVjc9R-oa2GrAFETm-4pUDFPnYu5OKulX9uirEye8euf_AhznbmeTnctoVb8l2_5Rp1Nl5dwyqX_nH6x6vW231_4t3HyKv1F_7wTr9ennC1m-QQZsq25QPXHIAi-osfheGm6VqqE3Fkpffx-4GCYtvpnMrIx7QcYm5G0N.jpg",
    "/images/cctv/wireless/shx3vgluitmQiVzU5syhbmwk-0Zo-ta-SrdWqguzIVmNz_5xjFcXSsl0_2_8Axxgdy16XCd--NsS5sBiMQlO4WZtc9ZTioin2wIplyY8lT0xodcfV8c0NJF6XK2Qzh6y4Uf2g7qaqVONxkZNco-Kn2jhobNxh8h9dqZH5SpmLPlm5dpecDLFMggz6yZywQ1k.jpg"
  ],
  "IP Cameras": [
    "/images/cctv/ip/i3sCq33JbdmOZ_WKVY_ZVmVvM_KdFr5drwXpbzJrhreC1D7inYnwmW6wDB73XHdNCpRthAn-5v8NTBYpbO4KmXOyohfbeDADjURRxU9VSBVhsF42pxC83jIpYdsyXuiGscc2BqNi751r1zHTL697vWtU5VnYnU2s2bU-9ZMbi6evj0zghqBocsmQxnzYtZHR.jpg",
    "/images/cctv/ip/ljuNi5WadXxd3D-LTgoUo9BSJ5ctJdjNFlMjG8xkzfi1fU2dN3OC6g792UfozN-QLYWgw3r7fzrCYnLs2KlqdlkQz_VKl5YrGGdrAMr_oj0svf-zAbzVaUCKiAcab_aeSPv5DXCJrvEjvHcoPn0awsq5cmy5UNBtDy9a4KdATsW1K8e8t8xGctd7T2fcdIph.jpg",
    "/images/cctv/ip/rixHKUMUK8DfKz_lCX3tNlGhCASrDGbcgGwy6paf5z9G8N8glzxnr0YTwn5QVlp3bDRiqk9P9jovFRwvU_UbJfr3dK2F1omVnJWASrtYtge0WyqS8GgM1YuI8jkfZuU06IYbNcuK986XDXcrz_ghCVBO6TQ7XyhpxsYItbn2d7QrO0zhj7WNok_FFPytFdKZ.jpg",
    "/images/cctv/ip/vvGZAf-hVfzG1GgUaRhz7F2HJ0XBv3Bd6hIRvdwiNnYyeJZmkGDbtpVFZI8o_tnMT9CqXUt_2o7cWxKmc2yxtBCohaJEFFAcBrzzsrsuJRybktMHWOZLnPt4zSjtF-6F7j2S_XRT0ScHY4eLtgDmC3laSgvbwx36Aqdm8L_w17la4S9EJCGT-xo54acxQGnQ.jpg",
    "/images/cctv/ip/yWd9-zf8QvvP5Vzdf0Gc3V7AU6ko3lHgOopvTuGoPM4cxe94sxlwVsWOVIhRbjJukInlVru9NukGYZSsO3J5fTztHti5Dih8od-KFmkRzqnZcF-wb_KzOFqGe8gqSzVv_Wf3Kt4JcGmlOCSqtuRiY8kkN7LUvZvs64ALcSnZu2_cafQdU-oaJ1uMmi6_SCul.jpg"
  ],
  "Armed Escort Services": [
    "/uploads/devices/1785712708619-786829247.png"
  ]
};

// Generic Slider Component for Every Camera Category Card with Auto-Slide & Fixed Uniform Sizing
function CameraCardSlider({ images, cardIndex, categoryTitle }: { images: string[]; cardIndex: number; categoryTitle: string }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (current >= (images?.length || 0)) {
      setCurrent(0);
    }
  }, [images, current]);

  useEffect(() => {
    if (isPaused || !images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, images?.length]);

  const safeIndex = (images && images.length > 0 && current < images.length) ? current : 0;

  const prevImage = () => {
    if (!images || images.length === 0) return;
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (!images || images.length === 0) return;
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[340px] md:h-full min-h-[340px] overflow-hidden bg-white border-b border-slate-100 md:border-b-0 md:border-r border-slate-200 group/slider"
    >
      <AnimatePresence mode="wait">
        <motion.img 
          key={safeIndex}
          src={getMediaUrl(images[safeIndex])} 
          alt={`${categoryTitle} - Image ${safeIndex + 1}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-contain object-center absolute inset-0 p-6 z-10" 
        />
      </AnimatePresence>

      {/* Prev / Next Control Arrows */}
      {images && images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
        {images && images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              safeIndex === idx ? "w-6 bg-[#38BDF8]" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Card Index Badge */}
      <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bebas text-lg text-[#0284C7] font-bold shadow-md border-2 border-sky-200">
        {cardIndex + 1}
      </div>

      <div className="absolute bottom-3 left-4 z-20 text-xs text-slate-800 font-inter bg-sky-50 border border-sky-200 px-3 py-1 rounded-md shadow-sm font-semibold">
        {categoryTitle} • {safeIndex + 1} / {images?.length || 0}
      </div>
    </div>
  );
}

// 2. Camera Categories Data with descriptions, best for, and features
const CAMERA_CATEGORIES = [
  {
    title: "Dome Cameras",
    desc: "Ideal for indoor surveillance where aesthetics and wide-angle coverage are important.",
    bestFor: ["Offices", "Retail Stores", "Hospitals", "Schools", "Hotels"],
    features: ["Compact Design", "Vandal Resistant", "Infrared Night Vision", "Wide Viewing Angle", "Indoor & Outdoor Models"]
  },
  {
    title: "Bullet Cameras",
    desc: "Designed for long-range outdoor surveillance with high-visibility deterrence.",
    bestFor: ["Parking Areas", "Building Perimeters", "Warehouses", "Industrial Facilities"],
    features: ["Long-Distance Monitoring", "Weatherproof Housing", "HD Recording", "Infrared Night Vision", "Easy Wall Mounting"]
  },
  {
    title: "PTZ Cameras",
    desc: "Monitor large areas with remote control, motorized optical zoom, and intelligent tracking.",
    bestFor: ["Airports", "Stadiums", "Industrial Plants", "Large Campuses"],
    features: ["360° Rotation", "Optical Zoom", "Auto Tracking", "Remote Operation", "Large Area Coverage"]
  },
  {
    title: "Turret Cameras",
    desc: "A versatile option for homes and businesses with flexible installation angles and zero IR reflection.",
    bestFor: ["Homes", "Shops", "Offices"],
    features: ["Easy Angle Adjustment", "High Image Quality", "Low IR Reflection", "Compact Design"]
  },
  {
    title: "Fisheye Cameras",
    desc: "Capture 180° to 360° panoramic views with a single camera and digital dewarping.",
    bestFor: ["Shopping Malls", "Conference Rooms", "Banks"],
    features: ["180°–360° Coverage", "Panoramic View", "Digital Dewarping"]
  },
  {
    title: "Box Cameras",
    desc: "Professional-grade cameras for high-security environments requiring custom specialized optics.",
    bestFor: ["Banks", "Warehouses", "Critical Infrastructure"],
    features: ["Long-Distance Monitoring", "Interchangeable Lens", "High Performance"]
  },
  {
    title: "Wireless Cameras",
    desc: "Simple cable-free installation with direct Wi-Fi connectivity and mobile streaming.",
    bestFor: ["Homes", "Small Offices"],
    features: ["Wi-Fi Connectivity", "Mobile Monitoring", "Cloud Recording", "Easy Installation"]
  },
  {
    title: "IP Cameras",
    desc: "Network-based PoE surveillance streaming 4K video with integrated AI analytics.",
    bestFor: ["Corporate Offices", "Commercial Buildings", "Smart Campuses"],
    features: ["High Resolution", "Remote Monitoring", "PoE Support", "AI Integration"]
  },
  {
    title: "Armed Escort Services",
    desc: "Our Armed Escort Services provide secure transportation and protection for valuable assets, confidential consignments, and high-risk movements. Our trained personnel ensure safe transit by following strict security protocols and maintaining constant vigilance throughout the journey.",
    bestFor: ["Cash Transit", "Valuable Goods Transportation", "High-Risk Movements", "Confidential Consignments"],
    features: ["Licensed Armed Personnel", "Secure Transit Protocol", "Asset Protection", "24/7 Deployment", "Route Security", "Threat Response"]
  }
];

// 3. Available CCTV Technologies
const TECHNOLOGIES = [
  "Analog CCTV",
  "HD Analog CCTV",
  "IP Surveillance",
  "Wireless CCTV",
  "PoE Cameras",
  "AI Smart Cameras",
  "Thermal Cameras",
  "Facial Recognition Cameras",
  "Number Plate Recognition (ANPR)",
  "Solar CCTV Systems",
  "Color Night Vision Cameras"
];

// 4. Smart AI Features
const SMART_AI_FEATURES = [
  "Motion Detection",
  "Human Detection",
  "Vehicle Detection",
  "Facial Recognition",
  "Number Plate Recognition",
  "Line Crossing Detection",
  "Intrusion Detection",
  "Auto Tracking",
  "Tamper Detection",
  "Privacy Masking",
  "Smart Notifications"
];

// 5. Industry Deployments with associated camera hardware category & photo showcases
const INDUSTRIES_SOLUTIONS = [
  { 
    title: "Residential Security", 
    desc: "Protect homes, villas, apartments, and gated communities with reliable surveillance.", 
    icon: <Home className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "Dome Cameras",
    recommendedCameras: ["Dome Cameras", "Wireless Cameras", "Turret Cameras"],
    images: [
      "/images/cctv/dome/VP26P-T89uJ-K4JLfuW_mCGOQrehf1rTqHCz-e2Ljrz9UIAVV-9CwaTIQ05Vyji3sHDITRGOT28HEbJolIJ4vxOc3XKNS2_ieTsd_ldZsFmy7S1e2i6z9JFD7CMT0Ptxb4PLN5SO9c0LMySMybvgzvYgPg2xSp16lX5LEPaujV7xkX-xJEwe5PBxzNHCZ9RJ.jpg",
      "/images/cctv/wireless/Brvszyepf42s5qZOHOAHslHNpglvdvo9PMoYRQhxYT33PpW20NMHVgGaGTBSKOUtKz58ty5dNdZuQJHOaaKklJk5X1WJjqsgARAmf-haRLtNk5gS52RdDpS7coUbcbhPucAXkXjwgrD6jYeBjgqv2LydGogqPtVIPraHi0WtD454D1rY3I_nUnYkiqYmLpx-.jpg",
      "/images/cctv/turret/SvQC9SamokYa7sTS8d57xE6RX4is0AptxJ0pWwb0wOzmoVwoAI2LVJpHdmDKkU2PGaOk88CNx-qw6KQPH8VTuY-kMrIJhqGAU8LhseFuWWAbCREn3WIqZtlSe09DraRjrzIdCUzG17iu3Vahl1EPzytuUgGX27CgJCnglQ5hPIwkQcXNJmB37jTOJZ.jpg"
    ]
  },
  { 
    title: "Commercial Security", 
    desc: "Monitor offices, retail stores, shopping malls, and business centers.", 
    icon: <Building2 className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "IP Cameras",
    recommendedCameras: ["IP Cameras", "Dome Cameras", "Fisheye Cameras"],
    images: [
      "/images/cctv/ip/i3sCq33JbdmOZ_WKVY_ZVmVvM_KdFr5drwXpbzJrhreC1D7inYnwmW6wDB73XHdNCpRthAn-5v8NTBYpbO4KmXOyohfbeDADjURRxU9VSBVhsF42pxC83jIpYdsyXuiGscc2BqNi751r1zHTL697vWtU5VnYnU2s2bU-9ZMbi6evj0zghqBocsmQxnzYtZHR.jpg",
      "/images/cctv/fisheye/TS5VM_mHNYm7bXe2lP9oy6g7-5BofDkiQ5COLXuSLCnY4JYiRnmbwRmN26mSEd3Bjuqj9cWWIEP25sIF3zzyDz3Ya9jBW4Dt1YY1WYlHtUk5Rc9rcPrfhx0riX-XOiUo44q49C74HTi7xGLBykUjQ-7E7KN3G-7Y28IdCcePmkDYmg_Zd2dIEmtV5KaqPgR4.jpg",
      "/images/cctv/dome/aR15OIAMnao-N2Ix3CohgQ9EXocqgqQqaEYuCUkgQKMnf46SlCzTUUpGiOdgXfHmwIyC41DbLV6GSIxYm5UUwIWaqfrNK9ivUEJ_cp_NMxakT9w-wVPS-qTC93bYlqCqrKXO5-TqFwx1nn3nnnVTiE-Eix78Bm19TD6iNtDFgdeyMLdWVjP1zTGYKYTKzNJ6.jpg"
    ]
  },
  { 
    title: "Industrial Security", 
    desc: "Secure factories, manufacturing units, warehouses, and logistics centers.", 
    icon: <Factory className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "Bullet Cameras",
    recommendedCameras: ["Bullet Cameras", "PTZ Cameras", "Box Cameras"],
    images: [
      "/images/cctv/bullet/5TenuMzbyrJ5zN0UlqJ7rRLKXQYhnM_6tlAF-812He89l4ewjQtYvQz0U2gZmtzIoM6DEV_Gaeq8nlCT8uvXj5FAljDUZ-rQ5YkGEwo6ebOoaRxWLaQcNQ93W5_gFrc0emAiera7qRjYWAA2QgLExxjNhqQAc2YUDddtb9G4wvWKnSd4kuK8n5sQOwy2MUIv.jpg",
      "/images/cctv/ptz/3VZFzDiO72AoHwakoDLGNvHFkLVUgiVmdQducNVhp2laXGUxxuEihWeWCa-dDMGUnVT_4KzH-nq6GoEdOUfhEhtTd0Uw1GJt9KAX4BozyvPncmgmz6YE_TzQrfjNbxXV-HT9CTiX5wZ6GKdIAAwg0fmn0PHaX2GytRGANTYHlXqYsuhCuCNXrSxhmb.jpg",
      "/images/cctv/box/BKOHaLctffpqc4yN-yDyQsAKOsvFpgeccn3PFGqtjvU7T8bMZRY2-NDm241havjANPwiSa0GKhHPX6EKvdqBR5YIhTS2pbBCyHYdseavlJFJ8ZlKaTFyQ6PoGzIkBERboX5Tc5xLKVvSTc9CUdPdR6Axflm1GEdBrHY18FmPoXjXqAlN3rtaJD91xXzfiJ6-.jpg"
    ]
  },
  { 
    title: "Educational Institutions", 
    desc: "Ensure campus safety with surveillance and centralized monitoring.", 
    icon: <GraduationCap className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "Dome Cameras",
    recommendedCameras: ["Dome Cameras", "IP Cameras", "PTZ Cameras"],
    images: [
      "/images/cctv/dome/r2otC68jlCzyJlZcaKTWDSBYBb77CSEmVzBQvJVhd9xjc-AMcZe64CfmP2Hx033Gg4NNEGF9iH_IBOlbzzn0RYvP3xZnRR9ubPLTdDmyJ_DtSeK9y8uCAB8oYQKDcnwFqSrn-S7mYlQ1hWZh5fJpRehEjCnZfeTPwYLDQCm5a3I_k7H4Q6l7A87yY4OHhhXu.jpg",
      "/images/cctv/ip/ljuNi5WadXxd3D-LTgoUo9BSJ5ctJdjNFlMjG8xkzfi1fU2dN3OC6g792UfozN-QLYWgw3r7fzrCYnLs2KlqdlkQz_VKl5YrGGdrAMr_oj0svf-zAbzVaUCKiAcab_aeSPv5DXCJrvEjvHcoPn0awsq5cmy5UNBtDy9a4KdATsW1K8e8t8xGctd7T2fcdIph.jpg",
      "/images/cctv/ptz/3aKrogU_PuxGSGBe-nhUYKXexZtmUjqpXQmT1IVaaKTEKyjTKONcdDQwHBaPSde4YYMnq9dcsxTLd6BWteoJSDZZzG2vun5HpISbA5gg3mwfObCApsrzpV8y45lD9OsFfJuub7YcY9i3BVHZHMkm-awPJIYggJQXyv6AWmBfRR1FpKgwTKXsyhVxXN.jpg"
    ]
  },
  { 
    title: "Healthcare Facilities", 
    desc: "Protect patients, staff, and critical medical infrastructure.", 
    icon: <HeartPulse className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "Turret Cameras",
    recommendedCameras: ["Turret Cameras", "Dome Cameras", "IP Cameras"],
    images: [
      "/images/cctv/turret/U7CLK71NU3s8iXCUDDnwjWFGkKak_GQxcryQm7jSfv5enZ7cOoZ_L1dAXEb2kH7EX3-qlNB8ObfFVrWZFz3kBDc07GTN86pjlknhQl8thZPlVGYg4nc4mXOnhV_lE9JR_ybvw3S47l8CGeI2-inqnFEh3U0To9VLCVbNggk3UxDByi5_a-VdXKwckfXSX.jpg",
      "/images/cctv/dome/u425wWqjSne5ZRNEsNTVsdL5WJaDU_T7fbtTlVAwrN8qZyxU2ZLWKzTl0AKHA97uqNlw21lM2tnsSfPzBLSevLsAIVTyNbM9xaTNJ7RZsu2nNXmctv424r5V_oEddPxGW5QEamd8pT1bvSMLaTf33eE2n8JpnlCIZ2pmSPbYvzmCsfe27Vo-cigWgHIljqk4.jpg",
      "/images/cctv/ip/rixHKUMUK8DfKz_lCX3tNlGhCASrDGbcgGwy6paf5z9G8N8glzxnr0YTwn5QVlp3bDRiqk9P9jovFRwvU_UbJfr3dK2F1omVnJWASrtYtge0WyqS8GgM1YuI8jkfZuU06IYbNcuK986XDXcrz_ghCVBO6TQ7XyhpxsYItbn2d7QrO0zhj7WNok_FFPytFdKZ.jpg"
    ]
  },
  { 
    title: "Hospitality", 
    desc: "Monitor hotels, resorts, and banquet halls seamlessly.", 
    icon: <Hotel className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "Fisheye Cameras",
    recommendedCameras: ["Fisheye Cameras", "Dome Cameras", "Wireless Cameras"],
    images: [
      "/images/cctv/fisheye/Ush_DdR3vMVmqCf4d1nt4lQAq9hldeHwyTBh6y3zoljh6SeBCVZt5CAaDliqxLBDZMu85moC7GsjKM1MjlwqNkGE_TlVYRs89Iht8-ya3PJz_qSuOjgKPUfwdaZBiYj7Tt4QAhGgb0x6tqzwRqKLYQhtrB_AIndte2Z1hQMDtHhUeGBDDG7ndn2py_PDRmm9.jpg",
      "/images/cctv/dome/yazGO60BVUnAjl4kRWiQTlbdEKm0PTYoPZ6VPY9I2ZDOeJdhaTmIwMbdeC3WM0VqF_v4D154an8fFs-j2Ar8scBDKAhOvOU6ZJR8tY78EHQbo7-EkwimgEhYv7dWlNK2Lh6jMzhvW6kEJt4jTQUZZK9YS4SnJgl-s1TtM8gm0EKH9o_Q2q20hADEpAG0oO4x.jpg",
      "/images/cctv/wireless/GtV2rqk8eCg7gap3Ik_Ydtw7zlO8SmIACi0w5gOoyYRy2hNtEoDDfd5NV8_EaNk9rr_Cr0j9puxo9pLJ6ErNMwGtMGZpQmtps0HgzleQ9ujnURnEGP3AQDLIBnnQtBaV-zdBnNnyDqo44lHC4_7MW4T4HYGIji2SZZeywiNGeWoFsHG08ct2qQzEXB1vhhCU.jpg"
    ]
  },
  { 
    title: "Warehouses & Logistics", 
    desc: "Prevent theft and monitor inventory loading dock movement.", 
    icon: <Warehouse className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "Box Cameras",
    recommendedCameras: ["Box Cameras", "Bullet Cameras", "PTZ Cameras"],
    images: [
      "/images/cctv/box/Fe1Qq_64vlWphAGvAmJubos5KSpGNf8VbmlyRkA81EAKUFcHzqxiQkO5XzoAfBveYaHanASF-IMDuM4gJaWF6hXkZVpYNqe-9Nx5H0SksElNWX33uJC0meCcitiW110F-CqOHGFn6w_2_nVkq7-j9pTTNGvfZvGYJ6N3K25OVjVaCOX52VhzkqH22oZOcKO4.jpg",
      "/images/cctv/bullet/8Dsr3zpELO5_i6Dw3WkGDPB5bvIo2xpl1Y54iXMy-VN1hvn1_TiJ1W5nF7BcFoBitTlE1aBJoCoa9PnINtCq5t2ZMJyqZrx9YxVSg0FO-GjwBo92o17OnCuDkjK0naravjnMq4I1-8v-dj8jUtlb4BM6C7ZmpniwtjnlFBRtuDj8HcotH-N-q-BSomI0CS-R.jpg",
      "/images/cctv/ptz/Vlz-EAnASOVOJ2jEVJn58a3VRhJrMprpxgl4kHw_i9m5hk8fcGwojFXsx2gdTqCRM4VQRmVBuVkTefVoPkoaS8cGkOUzyt7fwoJyrhXT0Ed0C3egDvT7r7I25TP4gYD8ZX6ZVgtslJb0WiJhWLv60xsP2CCWsIBDs7hnXHsTRym--katr4eF72026k.jpg"
    ]
  },
  { 
    title: "Government & Public", 
    desc: "Reliable surveillance for administrative buildings and public infrastructure.", 
    icon: <Landmark className="w-6 h-6 text-[#0284C7]" />,
    categoryKey: "PTZ Cameras",
    recommendedCameras: ["PTZ Cameras", "IP Cameras", "Box Cameras"],
    images: [
      "/images/cctv/ptz/kGRg3Y3qN8RHUOoTSBtoi7rt48JsuRKBfr2sS0ML7cyZZ8vaI-zJ1eiNAvfrQhe3tkbqdWo9YKgsW_lE8kBoQVKw0ep8j_BQWlJrZMxJCAZJ4JtPtkcqqRmS1_DytZ24dbDvIRmV5wAme_LEs4M-Ma3SjdjTBs8mnvjRx0xRfeaOYfoDvRH8LnzNVWu1UL0j.jpg",
      "/images/cctv/ip/vvGZAf-hVfzG1GgUaRhz7F2HJ0XBv3Bd6hIRvdwiNnYyeJZmkGDbtpVFZI8o_tnMT9CqXUt_2o7cWxKmc2yxtBCohaJEFFAcBrzzsrsuJRybktMHWOZLnPt4zSjtF-6F7j2S_XRT0ScHY4eLtgDmC3laSgvbwx36Aqdm8L_w17la4S9EJCGT-xo54acxQGnQ.jpg",
      "/images/cctv/box/JPEhOYfK6fHOyjL0jkF40iMSvmtI0CWHPWf-Ku6iZ0UY_HOMOD2XP13YvAqV5m44vT2ndC16u3GdxK4Kdw3qM6IaVCYjp_NLpxAY9-cc-hC7fvC-QdFJpfol183KvhEGScq6Hao98NrAz4snJgmMqUnqkuPN87ePyP7GR77adjPsOxw8H1Exeg7W5IpDs3kK.jpg"
    ]
  }
];

// 6. Installation Process Steps
const INSTALLATION_PROCESS = [
  { step: "01", title: "Requirement Consultation", desc: "Understanding your security needs, coverage area, and business objectives." },
  { step: "02", title: "Site Survey", desc: "Inspecting physical layout, lighting conditions, and identifying security vulnerabilities." },
  { step: "03", title: "Security Planning", desc: "Designing a customized CCTV layout with optimal camera placement and angle mapping." },
  { step: "04", title: "Professional Installation", desc: "Mounting cameras, laying conduit cabling, configuring NVR/DVR units, and network switches." },
  { step: "05", title: "Configuration & Testing", desc: "Setting up motion alerts, mobile remote access, cloud storage, and testing night vision." },
  { step: "06", title: "Training & Handover", desc: "Training your staff on system operation, live view playback, and delivering complete documentation." },
  { step: "07", title: "AMC & Support", desc: "Preventive maintenance, periodic lens cleaning, firmware updates, and 24/7 technical repair." }
];

// 7. Why Choose Family Anchor Facilities
const WHY_FAF = [
  { title: "Experienced Professionals", desc: "Certified technicians with extensive experience in CCTV installation and maintenance." },
  { title: "Premium Equipment", desc: "We work with top-tier trusted brands to ensure reliable performance and long-term durability." },
  { title: "Customized Solutions", desc: "Every project is tailored to your property's layout, risk level, and operational requirements." },
  { title: "End-to-End Service", desc: "From consultation and design to installation and maintenance, we provide complete security solutions." },
  { title: "Ongoing Support", desc: "Dedicated technical assistance, preventive health checks, and Annual Maintenance Contracts (AMC)." }
];

// 8. FAQ Accordion Items
const FAQS = [
  {
    q: "Which CCTV camera is best for my property?",
    a: "The right camera depends on your property size, lighting conditions, coverage requirements, and security objectives. Our experts conduct a free site survey to recommend the most suitable solution."
  },
  {
    q: "Can I monitor my CCTV cameras remotely?",
    a: "Yes. Most of our CCTV systems support secure remote viewing through mobile applications (iOS/Android) and web browsers, allowing you to monitor your property anytime, anywhere."
  },
  {
    q: "Do you provide maintenance services?",
    a: "Yes. We offer Annual Maintenance Contracts (AMC), preventive maintenance, repairs, firmware updates, lens cleaning, and 24/7 technical support."
  },
  {
    q: "How long are recordings stored?",
    a: "Storage duration depends on factors such as the number of cameras, recording resolution, recording mode (continuous vs motion-based), and hard drive capacity. We help configure a solution that meets your operational and compliance requirements."
  }
];

function parseJsonField(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split(" ").filter(Boolean); }
  }
  return [];
}

export default function CctvInstallationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);
  const [dbDevices, setDbDevices] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    settingsApi.getSettings()
      .then((res: any) => {
        if (res?.data) {
          setSiteSettings(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    devicesApi.getDevices({ serviceSlug: "cctv-installation", limit: 100 })
      .then(res => { if (res.success && res.data?.devices) setDbDevices(res.data.devices); })
      .catch(err => console.error("Failed to fetch CCTV devices:", err));
  }, []);

  // Merge: DB devices take precedence; static is fallback
  const allCameras = dbDevices.length > 0
    ? dbDevices
        .slice()
        .sort((a, b) => {
          const orderA = (a.displayOrder && a.displayOrder > 0) ? a.displayOrder : 999;
          const orderB = (b.displayOrder && b.displayOrder > 0) ? b.displayOrder : 999;
          if (orderA !== orderB) return orderA - orderB;
          return (a.id || 0) - (b.id || 0);
        })
        .map(d => ({
          title: d.name,
          desc: d.description || "",
          bestFor: parseJsonField(d.bestFor),
          features: parseJsonField(d.keyFeatures),
          dbImages: (Array.isArray(d.images) && d.images.length > 0)
            ? d.images
            : d.imagePath ? [d.imagePath] : []
        }))
    : CAMERA_CATEGORIES.map(c => ({ ...c, dbImages: CAMERA_CATEGORY_IMAGES[c.title] || [] }));

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-black overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/dark-waves.png')] bg-cover bg-center bg-no-repeat opacity-45 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-[#38BDF8] font-bebas tracking-widest uppercase mb-4">
              <Link href="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <Link href="/services" className="hover:underline">Services</Link>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span>CCTV Installation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Professional <span className="text-[#38BDF8]">CCTV Installation</span> Services
            </h1>
            
            <p className="text-[#38BDF8] font-bebas text-2xl tracking-wider uppercase mb-4">
              Protect What Matters Most with Intelligent Surveillance Solutions
            </p>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-inter max-w-3xl mx-auto mb-8">
              Secure your home, office, factory, warehouse, or commercial property with advanced CCTV surveillance systems from <strong>Family Anchor Facilities Pvt. Ltd.</strong> We provide end-to-end CCTV solutions, including consultation, system design, installation, configuration, maintenance, and Annual Maintenance Contracts (AMC).
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
              >
                <span>Get Free Site Survey</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full border border-white/20 backdrop-blur-md transition-all"
              >
                <span>Request a Quote</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white text-slate-900 relative border-b border-sky-100">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase block">
                24/7 Surveillance & Protection
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
                Complete CCTV Security Infrastructure
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                Continuous video monitoring and intelligent threat detection are vital to protecting your property, employees, and assets. <strong className="text-slate-900">Family Anchor Facilities Pvt. Ltd.</strong> provides end-to-end CCTV surveillance systems, including high-definition IP cameras, night vision infrared domes, AI-powered analytics, thermal imaging, and 24/7 technical AMC support.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter border-l-4 border-[#0284C7] pl-4 italic bg-sky-50/80 py-3 rounded-r-xl">
                From residential villas and commercial offices to large industrial complexes and logistics hubs, we engineer fully customized surveillance solutions tailored to your security requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[320px] sm:h-[400px] md:h-[480px] rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl group"
            >
              <img 
                src="/images/legacy/about-cctv.png" 
                alt="Complete CCTV Surveillance Infrastructure" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-zinc-900/90 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 text-white">
                <div className="flex items-center gap-3 text-[#38BDF8] mb-1">
                  <Cctv className="w-7 h-7" />
                  <span className="font-bebas text-2xl tracking-wide text-white">Intelligent Surveillance</span>
                </div>
                <p className="text-xs text-slate-300 font-inter">
                  Full HD crystal clear video, AI motion detection, and remote smartphone monitoring.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Choose Our CCTV Solutions? */}
      <section className="py-20 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Smart Surveillance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Choose Our CCTV Solutions?
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              We combine advanced surveillance technology with professional installation services to deliver reliable and scalable CCTV systems for every environment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {KEY_BENEFITS.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                className="bg-sky-50/80 p-5 rounded-2xl border border-sky-200 flex items-center gap-3 text-slate-800 font-inter font-medium shadow-sm hover:shadow-md transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0" />
                <span className="text-sm font-semibold">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CCTV Camera Categories Section */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Hardware Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              CCTV Camera Categories
            </h2>
            <p className="text-blue-100 text-lg font-inter mt-3">
              Choose the right camera based on your security requirements and property layout.
            </p>
          </div>

          {/* 1 Card Per Row Layout with Solid White Background */}
          <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
            {allCameras.map((cam, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="group bg-white text-slate-900 rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl hover:border-[#0284C7] transition-all grid md:grid-cols-2 md:h-[420px]"
              >
                {/* Left Side 50%: Image Slider — DB images take priority */}
                <CameraCardSlider 
                  images={(cam as any).dbImages?.length > 0 ? (cam as any).dbImages : (CAMERA_CATEGORY_IMAGES[(cam as any).title] || [])} 
                  cardIndex={idx} 
                  categoryTitle={cam.title} 
                />

                {/* Right Side 50%: Solid White Content Container */}
                <div className="p-6 md:p-8 flex flex-col justify-between bg-white overflow-hidden">
                  <div>
                    <h3 className="font-bebas text-4xl md:text-5xl tracking-wide text-slate-900 mb-3 group-hover:text-[#0284C7] transition-colors">
                      {cam.title}
                    </h3>

                    <p className="text-slate-600 text-sm md:text-base font-inter leading-relaxed mb-6">
                      {cam.desc}
                    </p>

                    {/* Best For Pills */}
                    <div className="mb-6">
                      <span className="font-bebas text-sm tracking-wider uppercase text-[#0284C7] block mb-2 font-bold">
                        Best For:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cam.bestFor.map((bf, bIdx) => (
                          <span key={bIdx} className="bg-sky-50 text-slate-800 font-inter text-xs px-3 py-1 rounded-full border border-sky-200 font-medium">
                            {bf}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <span className="font-bebas text-sm tracking-wider uppercase text-[#0284C7] block mb-2 font-bold">
                        Key Features:
                      </span>
                      <ul className="grid grid-cols-2 gap-2 font-inter text-xs md:text-sm text-slate-700">
                        {cam.features.map((ft, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                            <span className="truncate">{ft}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CCTV Technologies & Smart Features Grid */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Technologies */}
            <div className="bg-sky-50/80 rounded-[32px] p-8 md:p-10 border-2 border-sky-200">
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Modern Equipment
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-slate-900 mb-6">CCTV Technologies</h3>
              <p className="text-slate-600 text-sm font-inter mb-6">
                We install modern surveillance systems equipped with state-of-the-art hardware and streaming protocols.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {TECHNOLOGIES.map((tech, tIdx) => (
                  <div key={tIdx} className="bg-white p-3.5 rounded-xl border border-sky-200 flex items-center gap-2.5 shadow-sm text-slate-800 font-inter text-xs font-semibold">
                    <Zap className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart AI Features */}
            <div className="bg-[#0070c0] text-white rounded-[32px] p-8 md:p-10 border-2 border-[#38BDF8]/40 shadow-2xl">
              <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Intelligent Security
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-white mb-6">Smart AI Features</h3>
              <p className="text-blue-100 text-sm font-inter mb-6">
                Modern surveillance systems include intelligent security features designed to improve monitoring accuracy and reduce false alarms.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SMART_AI_FEATURES.map((ai, aIdx) => (
                  <div key={aIdx} className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 flex items-center gap-2.5 text-blue-100 font-inter text-xs font-medium">
                    <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>{ai}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CCTV Solutions by Industry - Interactive Card Selection */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Interactive Sector Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight mb-4">
              CCTV Solutions by Industry
            </h2>
            <p className="text-blue-100 font-inter text-base">
              Click on any industry card below to view recommended camera hardware and real project deployment photos.
            </p>
          </div>

          {/* Rectangular Industry Selection Tiles without Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
            {INDUSTRIES_SOLUTIONS.map((ind, idx) => {
              const isSelected = selectedIndustry === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndustry(idx)}
                  className={`w-full py-4 px-6 rounded-xl font-bebas text-xl md:text-2xl tracking-wider uppercase text-center transition-all duration-300 shadow-md ${
                    isSelected 
                      ? "bg-white text-[#0070c0] shadow-xl scale-105 ring-4 ring-[#38BDF8]" 
                      : "bg-white/90 text-slate-900 hover:bg-white hover:scale-102 border border-sky-200"
                  }`}
                >
                  {ind.title}
                </button>
              );
            })}
          </div>

          {/* Expanded Showcase View for Selected Industry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white text-slate-900 rounded-[32px] p-8 md:p-12 border-4 border-sky-300 shadow-2xl max-w-7xl mx-auto"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase block mb-1">
                    Industry Deployment Details
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-2">
                    {INDUSTRIES_SOLUTIONS[selectedIndustry].title} CCTV Hardware Setup
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base font-inter leading-relaxed max-w-3xl">
                    {INDUSTRIES_SOLUTIONS[selectedIndustry].desc}
                  </p>
                </div>

                {/* Recommended Camera Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bebas text-sm text-slate-500 uppercase tracking-wider block w-full lg:w-auto">
                    Recommended Cameras:
                  </span>
                  {INDUSTRIES_SOLUTIONS[selectedIndustry].recommendedCameras.map((rc, rIdx) => (
                    <span 
                      key={rIdx}
                      className="bg-[#0284C7] text-white font-bebas text-sm tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md"
                    >
                      {rc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photo Showcase Grid */}
              <div className="grid sm:grid-cols-3 gap-6">
                {INDUSTRIES_SOLUTIONS[selectedIndustry].images.map((imgUrl, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${INDUSTRIES_SOLUTIONS[selectedIndustry].title} Camera Photo ${imgIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-inter opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {INDUSTRIES_SOLUTIONS[selectedIndustry].recommendedCameras[imgIdx % INDUSTRIES_SOLUTIONS[selectedIndustry].recommendedCameras.length]} Deployment
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Our CCTV Installation Process */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Step-By-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Our CCTV Installation Process
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTALLATION_PROCESS.map((proc, idx) => (
              <div key={idx} className="bg-sky-50/80 p-6 rounded-2xl border border-sky-200 flex flex-col justify-between">
                <div>
                  <span className="font-bebas text-lg tracking-wider text-[#0284C7] font-bold block mb-2">Step {proc.step}</span>
                  <h3 className="font-bebas text-2xl tracking-wide text-slate-900 mb-2">{proc.title}</h3>
                  <p className="text-slate-600 text-xs font-inter leading-relaxed">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Frequently Asked Questions */}
      <section className="py-24 bg-sky-50/80 text-slate-900 relative border-t border-sky-200">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-sky-200 shadow-sm overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bebas text-2xl tracking-wide text-slate-900 hover:text-[#0284C7] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-6 h-6 text-[#0284C7] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0284C7]" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 text-slate-600 font-inter text-sm md:text-base leading-relaxed border-t border-sky-100 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action CTA */}
      <section className="py-24 bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 text-slate-900 border-t border-sky-100">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            High-Converting Security
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Secure Your Property with Professional CCTV Installation
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Protect your home or business with advanced surveillance solutions from <strong>Family Anchor Facilities Pvt. Ltd.</strong> Our experts are ready to design and install a CCTV system tailored to your specific security needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Request a Free Site Survey</span>
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full shadow-xl transition-all"
            >
              <span>Get a Custom Quote</span>
            </Link>
            {(() => {
              const rawPhone = siteSettings?.phone || "+91 9324831576";
              const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
              return (
                <a 
                  href={`tel:${cleanPhone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full shadow-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Our Security Experts ({rawPhone})</span>
                </a>
              );
            })()}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
