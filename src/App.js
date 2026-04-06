import { useState, useEffect, useRef } from "react";
import "./App.css";

import aboutImg from "./assets/about.png";
import experienceImg from "./assets/experience.png";
import facNatImg from "./assets/fac_nat.png";
import facRoomImg from "./assets/fac_room.png";
import facConfImg from "./assets/fac_conf.png";
import mhdcLogoImg from "./assets/mhdclogo.jpg";

/* ─────────────────────────────────────────────────────────────────────────────
   IMAGES - Loaded Local Assets
───────────────────────────────────────────────────────────────────────────── */
const IMAGES = {
  // Official MHDC logo from the website
  logo: mhdcLogoImg,
  heroBg: aboutImg,
  about: aboutImg,
  facility1: facNatImg,
  facility2: facRoomImg,
  facility3: facConfImg,
  experience: experienceImg,
};

const STATS = [
  { num: 200, suffix: "+", label: "Guests Capacity" },
  { num: 50, suffix: "+", label: "Events Per Year" },
  { num: 3, suffix: "", label: "Conference Rooms" },
  { num: 24, suffix: "/7", label: "Support Available" },
];

const FACILITIES = [
  {
    img: IMAGES.facility1,
    title: "Development Center",
    desc: "MHDC is committed to creating an uplifting and transformative environment that nurtures the mind, body, and spirit, promoting well-being and wellness in a serene natural setting surrounded by fresh air, natural beauty, and a calming mini-forest.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V13h6v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    img: IMAGES.facility2,
    title: "Accommodation",
    desc: "MHDC provides comfortable accommodation for individuals and groups, offering a restful, relaxing, and comfortable stay. Options include dormitory, twin sharing, and single room arrangements.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 20v-6a2 2 0 012-2h16a2 2 0 012 2v6M2 14h20M7 14V9a2 2 0 012-2h6a2 2 0 012 2v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    img: IMAGES.facility3,
    title: "Conference Rooms",
    desc: "Conference rooms accommodate small and large groups, equipped with audio-visual tools (Sound System, Microphone, TV), comfortable seating, and high-speed internet. Big room seats up to 160 pax; small room seats up to 60 pax.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    img: IMAGES.facility1,
    title: "Green Space",
    desc: "MHDC offers a peaceful sanctuary with scenic landscapes and abundant greenery, providing a tranquil space for rest, reflection, renewal, and reinvigoration.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22V12M12 12C12 12 7 10 5 6c3 0 5.5 1.5 7 6zM12 12C12 12 17 10 19 6c-3 0-5.5 1.5-7 6z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 22h14" strokeLinecap="round" />
      </svg>
    ),
  },
];

const EXPERIENCES = [
  { title: "Retreats & Camps", desc: "Immersive retreat experiences in a serene natural environment, perfect for personal renewal and group bonding." },
  { title: "Workshops & Seminars", desc: "Purpose-built spaces that support collaborative learning and professional development for teams of any size." },
  { title: "Corporate Training", desc: "Custom programs designed to energize your organization, blending focused work with restorative nature time." },
  { title: "Team Building", desc: "Outdoor and indoor activities that strengthen relationships and spark creativity in a refreshing setting." },
];

const SCHEDULE = [
  { time: "07:00 AM", title: "Morning Meditation", desc: "Start the day centered and focused with guided meditation in our serene open-air pavilion." },
  { time: "08:30 AM", title: "Healthy Breakfast", desc: "Enjoy a nutritious, farm-to-table breakfast served in the main dining hall." },
  { time: "10:00 AM", title: "Collaborative Workshop", desc: "Engage in team-building activities or focused group sessions in our fully equipped conference rooms." },
  { time: "12:30 PM", title: "Lunch & Free Time", desc: "A hearty lunch followed by time to explore the mini-forest or relax in the lounge." },
  { time: "02:30 PM", title: "Nature Walk & Reflection", desc: "Guided walking trails designed for introspection and connecting with nature." },
  { time: "04:30 PM", title: "Afternoon Session", desc: "Wrap up the day's objectives with a final productive meeting or creative session." },
  { time: "07:00 PM", title: "Dinner & Fellowship", desc: "Gather around for dinner and optional evening activities like a bonfire." },
];

const FAQS = [
  { q: "What is the booking process?", a: "To secure a date, please fill out the booking inquiry form. Our team will contact you within 24 hours to finalize details and provide a contract." },
  // { q: "What are the room rates?", a: "Rates are per person per day: Dormitory — ₱1,300 (without aircon) / ₱1,400 (with aircon); Twin Sharing — ₱1,600 / ₱1,800; Single Room — ₱1,700 / ₱1,900. Conference Room (Big, 160 pax) — ₱2,500/day; Conference Room (Small, 60 pax) — ₱1,500/day." },
  { q: "What is included in the package?", a: "Package inclusions: PM Snacks, Dinner, Breakfast, AM Snacks, and Lunch; Conference Room (non-airconditioned); Audio-Visual Equipment (Sound System, Microphone, TV); Complimentary Wi-Fi for five (5) devices. For groups of at least 50 pax, the Resource Person or Retreat Master is FREE for the whole duration of stay." },
  { q: "Do you provide audio-visual equipment?", a: "Yes. All packages include a Sound System, Microphone, and TV. Conference rooms also have high-speed internet access to support productive and engaging sessions." },
  { q: "Can we customize the retreat schedule?", a: "Yes! The schedule is entirely up to you. Whether you want an intensive training day or a relaxed schedule with plenty of free time, we will accommodate your plans." },
  { q: "What is your cancellation policy?", a: "Cancellations made 30 days prior to the event are fully refundable. Cancellations within 30 days may be subject to a fee. Please refer to our full terms during booking." },
];

const FEATURE_TAGS = ["Retreats", "Conferences", "Training Activities", "Seminars", "Workshops", "Camps", "Team Building"];

const PERKS = [
  {
    title: "Meals Included",
    desc: "PM Snacks, Dinner, Breakfast, AM Snacks, and Lunch — all served in a clean, spacious dining area.",
    icon: <svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    title: "AV Equipment",
    desc: "Sound System, Microphone, and TV included in all packages. High-speed Wi-Fi for 5 devices.",
    icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    title: "Resource Person FREE",
    desc: "For groups of 50 pax and above, the Resource Person or Retreat Master is free for the whole stay.",
    icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    title: "Flexible Packages",
    desc: "Customizable overnight and multi-day packages for retreats, seminars, trainings, and gatherings.",
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   LOAD SCRIPTS HELPER
───────────────────────────────────────────────────────────────────────────── */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   THREE.JS SCENE — Enhanced 3D background with floating golden particles
───────────────────────────────────────────────────────────────────────────── */
function useThreeScene(canvasRef) {
  useEffect(() => {
    if (!canvasRef.current) return;

    let animId;
    const canvas = canvasRef.current;

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js")
      .then(() => {
        if (!window.THREE) return;
        const THREE = window.THREE;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.set(0, 2, 16);

        // Ambient and directional lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        const dirLight = new THREE.DirectionalLight(0xf7ce02, 0.6);
        dirLight.position.set(5, 8, 5);
        scene.add(dirLight);

        const backLight = new THREE.PointLight(0xf7ce02, 0.3);
        backLight.position.set(-3, 2, -5);
        scene.add(backLight);

        // Floating geometric shapes
        const shapeGroup = new THREE.Group();
        scene.add(shapeGroup);

        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xf7ce02,
          emissive: 0x442200,
          emissiveIntensity: 0.15,
          metalness: 0.7,
          roughness: 0.3,
          transparent: true,
          opacity: 0.25
        });

        // Interactive mouse tracking
        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
          mouseX = (e.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", onMouseMove);

        const shapes = [];
        const createPebbleGeo = () => {
          const geo = new THREE.IcosahedronGeometry(0.4, 3);
          const pos = geo.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const noise = 1 + (Math.random() - 0.5) * 0.2;
            pos.setXYZ(i, pos.getX(i) * noise, pos.getY(i) * noise, pos.getZ(i) * noise);
          }
          geo.computeVertexNormals();
          geo.scale(1 + Math.random() * 0.6, 0.4 + Math.random() * 0.4, 0.8 + Math.random() * 0.5);
          return geo;
        };
        const geometries = Array.from({ length: 6 }, createPebbleGeo);

        for (let i = 0; i < 16; i++) {
          const geo = geometries[i % geometries.length];
          const mesh = new THREE.Mesh(geo, goldMat.clone());
          mesh.position.set(
            (Math.random() - 0.5) * 28,
            (Math.random() - 0.5) * 18,
            (Math.random() - 0.5) * 12 - 4
          );
          mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          mesh.scale.setScalar(0.7 + Math.random() * 0.8);

          shapes.push({
            mesh,
            speedRot: { x: (Math.random() - 0.5) * 0.008, y: (Math.random() - 0.5) * 0.008, z: (Math.random() - 0.5) * 0.005 },
            speedFloat: 0.0008 + Math.random() * 0.001,
            floatOffset: Math.random() * Math.PI * 2,
            startY: mesh.position.y
          });
          shapeGroup.add(mesh);
        }

        // Golden particle system
        const particleCount = 800;
        const particleGeo = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleVelocities = [];

        for (let i = 0; i < particleCount; i++) {
          particlePositions[i * 3] = (Math.random() - 0.5) * 35;
          particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
          particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 5;
          particleVelocities.push({
            x: (Math.random() - 0.5) * 0.008,
            y: (Math.random() - 0.5) * 0.006,
            z: (Math.random() - 0.5) * 0.005
          });
        }
        particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

        const particleMat = new THREE.PointsMaterial({
          color: 0xf7ce02,
          size: 0.045,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Floating rings
        const ringGeo = new THREE.TorusGeometry(5.2, 0.04, 64, 200);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xf7ce02, emissive: 0x442200, emissiveIntensity: 0.1, transparent: true, opacity: 0.2 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.5;
        ring.rotation.z = 0.3;
        ring.position.y = 1;
        scene.add(ring);

        const ring2Geo = new THREE.TorusGeometry(3.8, 0.03, 64, 160);
        const ring2 = new THREE.Mesh(ring2Geo, ringMat);
        ring2.rotation.x = Math.PI / 1.8;
        ring2.rotation.z = -0.5;
        ring2.position.y = -1.5;
        ring2.position.x = -2;
        scene.add(ring2);

        // Scroll parallax effect
        let scrollY = 0;
        const onScroll = () => { scrollY = window.scrollY; };
        window.addEventListener("scroll", onScroll);

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        let time = 0;
        const animate = () => {
          animId = requestAnimationFrame(animate);
          time += 0.008;

          // Dynamic light targeting mouse
          dirLight.position.x += (mouseX * 8 - dirLight.position.x) * 0.05;
          dirLight.position.y += (mouseY * 8 + 5 - dirLight.position.y) * 0.05;

          // Animate shapes
          shapes.forEach(shape => {
            shape.mesh.rotation.x += shape.speedRot.x;
            shape.mesh.rotation.y += shape.speedRot.y;
            shape.mesh.rotation.z += shape.speedRot.z;
            shape.mesh.position.y = shape.startY + Math.sin(time * 1.5 + shape.floatOffset) * 0.12;
          });

          // Animate particles
          const positions = particleGeo.attributes.position.array;
          for (let i = 0; i < particleCount; i++) {
            positions[i * 3] += particleVelocities[i].x;
            positions[i * 3 + 1] += particleVelocities[i].y;
            positions[i * 3 + 2] += particleVelocities[i].z;

            if (Math.abs(positions[i * 3]) > 18) particleVelocities[i].x *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 12) particleVelocities[i].y *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 12) particleVelocities[i].z *= -1;
          }
          particleGeo.attributes.position.needsUpdate = true;

          // Rotate rings
          ring.rotation.z += 0.0015;
          ring2.rotation.x += 0.001;

          // Camera parallax
          scene.position.x += (mouseX * 0.5 - scene.position.x) * 0.05;
          scene.position.y += (mouseY * 0.5 - scrollY * 0.0015 - scene.position.y) * 0.05;

          camera.position.x = Math.sin(time * 0.1) * 0.3;
          camera.position.y = Math.sin(time * 0.15) * 0.2;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        };
        animate();

        return () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("scroll", onScroll);
          cancelAnimationFrame(animId);
          renderer.dispose();
        };
      })
      .catch(() => { });

    return () => { if (animId) cancelAnimationFrame(animId); };
  }, [canvasRef]);
}

/* ─────────────────────────────────────────────────────────────────────────────
   NATURE BREAK CANVAS
───────────────────────────────────────────────────────────────────────────── */
function NatureBreakCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    let animId;

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js")
      .then(() => {
        if (!window.THREE) return;
        const THREE = window.THREE;

        const canvas = ref.current;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);

        const resize = () => {
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        };
        resize();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 50);
        camera.position.set(0, 2, 10);
        camera.lookAt(0, 0, 0);

        const planeGeo = new THREE.PlaneGeometry(22, 12, 80, 48);
        const planeMat = new THREE.MeshStandardMaterial({
          color: 0xf7ce02,
          wireframe: false,
          flatShading: true,
          transparent: true,
          opacity: 0.18,
          emissive: 0x442200,
          emissiveIntensity: 0.15,
          metalness: 0.8,
          roughness: 0.3
        });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2.8;
        plane.position.y = -1.2;
        scene.add(plane);

        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        const dirLight = new THREE.DirectionalLight(0xf7ce02, 0.4);
        dirLight.position.set(2, 5, 3);
        scene.add(dirLight);

        const clock = new THREE.Clock();
        const posAttr = planeGeo.attributes.position;
        const origY = new Float32Array(posAttr.count);
        for (let i = 0; i < posAttr.count; i++) origY[i] = posAttr.getY(i);

        const animate = () => {
          animId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          for (let i = 0; i < posAttr.count; i++) {
            const x = posAttr.getX(i);
            const z = posAttr.getZ(i);
            posAttr.setY(i, origY[i] + Math.sin(x * 0.6 + t * 0.8) * 0.2 + Math.sin(z * 0.8 + t * 0.5) * 0.15);
          }
          posAttr.needsUpdate = true;
          planeGeo.computeVertexNormals();

          camera.position.x = Math.sin(t * 0.1) * 0.3;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        };
        animate();

        window.addEventListener("resize", resize);
        return () => {
          window.removeEventListener("resize", resize);
          cancelAnimationFrame(animId);
          renderer.dispose();
        };
      })
      .catch(() => { });

    return () => { if (animId) cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={ref} className="nature-break-canvas" style={{ width: "100%", height: "100%" }} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   GSAP SCROLL ANIMATIONS
───────────────────────────────────────────────────────────────────────────── */
function useGSAPAnimations() {
  useEffect(() => {
    // Hard fallback: if GSAP doesn't load or animations don't fire within 3s,
    // force all animated elements to be fully visible
    const hardFallback = setTimeout(() => {
      document.querySelectorAll(
        ".stat-item, .facility-card, .exp-item, .perk-item, .timeline-item, .faq-item, .map-wrap, .feature-tag, .nature-break-quote, .about-badge"
      ).forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.visibility = "visible";
      });
    }, 3000);

    Promise.all([
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"),
    ]).then(() => {
      const gsap = window.gsap;
      const ST = window.ScrollTrigger;
      if (!gsap || !ST) {
        clearTimeout(hardFallback);
        // If GSAP failed to load, make everything visible immediately
        document.querySelectorAll(
          ".stat-item, .facility-card, .exp-item, .perk-item, .timeline-item, .faq-item, .map-wrap, .feature-tag, .nature-break-quote, .about-badge"
        ).forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
        return;
      }
      gsap.registerPlugin(ST);

      // Hero animations
      gsap.to(".hero-tag", { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
      gsap.to(".hero-title", { opacity: 1, y: 0, duration: 0.9, delay: 0.4 });
      gsap.to(".hero-title-accent", { opacity: 1, y: 0, duration: 0.9, delay: 0.55 });
      gsap.to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, delay: 0.7 });
      gsap.to(".hero-cta", { opacity: 1, y: 0, duration: 0.8, delay: 0.85 });
      gsap.to(".hero-scroll-indicator", { opacity: 1, duration: 0.8, delay: 1.2 });

      // Stats counter animation
      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".stats-bar", start: "top 95%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: () => {
          document.querySelectorAll(".stat-item").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // Feature tags
      gsap.from(".feature-tag", {
        scrollTrigger: { trigger: ".feature-tags", start: "top 95%", once: true },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.5)",
        onComplete: () => {
          document.querySelectorAll(".feature-tag").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // Facility cards
      gsap.from(".facility-card", {
        scrollTrigger: { trigger: ".facilities-grid", start: "top 95%", once: true },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        onComplete: () => {
          document.querySelectorAll(".facility-card").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // Experience items
      gsap.from(".exp-item", {
        scrollTrigger: { trigger: ".exp-list", start: "top 95%", once: true },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
          document.querySelectorAll(".exp-item").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // Perk items
      gsap.from(".perk-item", {
        scrollTrigger: { trigger: ".perks", start: "top 95%", once: true },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
          document.querySelectorAll(".perk-item").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // Nature break quote
      gsap.from(".nature-break-quote", {
        scrollTrigger: { trigger: ".nature-break", start: "top 95%", once: true },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          document.querySelectorAll(".nature-break-quote").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // About badge
      gsap.from(".about-badge", {
        scrollTrigger: { trigger: ".about-inner", start: "top 95%", once: true },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.8)",
        delay: 0.3,
        onComplete: () => {
          document.querySelectorAll(".about-badge").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // Image Parallax
      gsap.utils.toArray(".about-img, .exp-visual img").forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        gsap.set(img, { scale: 1.15 });
      });

      // Schedule timeline — animate each item individually so they all trigger
      document.querySelectorAll(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 95%", once: true },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.05,
          ease: "power3.out",
          onComplete: () => { item.style.opacity = "1"; item.style.transform = "none"; }
        });
      });

      // FAQ reveals — animate each item individually
      document.querySelectorAll(".faq-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 95%", once: true },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.05,
          ease: "power2.out",
          onComplete: () => { item.style.opacity = "1"; item.style.transform = "none"; }
        });
      });

      // Map reveal
      gsap.from(".map-wrap", {
        scrollTrigger: { trigger: ".map-wrap", start: "top 95%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        onComplete: () => {
          document.querySelectorAll(".map-wrap").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        }
      });

      // Clear the hard fallback since GSAP loaded fine
      clearTimeout(hardFallback);

      // 3D Tilt Hook up for Facility Cards
      document.querySelectorAll(".facility-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;
          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power1.out"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.7, ease: "power2.out" });
        });
      });

    }).catch(() => { });
  }, []);
}

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────────── */
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn);
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useScrollReveal() {
  useEffect(() => {
    const revealEl = (el) => {
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add("visible"), delay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) revealEl(e.target);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    els.forEach((el) => {
      // If already in viewport on load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        revealEl(el);
      } else {
        io.observe(el);
      }
    });

    // Hard fallback after 1.5s — any element still hidden gets forced visible
    const fallback = setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
        el.classList.add("visible");
      });
    }, 1500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);
}

/* ─────────────────────────────────────────────────────────────────────────────
   COUNTER COMPONENT
───────────────────────────────────────────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let cur = 0;
          const step = target / 55;
          const timer = setInterval(() => {
            cur += step;
            if (cur >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(cur));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────────────────── */
function Navbar({ scrolled }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-container" onClick={() => scrollToSection("hero")}>
        {IMAGES.logo
          ? <img src={IMAGES.logo} alt="MHDC Logo" className="logo-img" style={{ height: 44, width: "auto", objectFit: "contain", borderRadius: "10px" }} />
          : <div className="logo-icon">M</div>
        }
        <div className="logo-text">
          {/* <span className="sub">MHDC</span> */}
          <span className="main">MaPSA Holistic Development Center</span>
        </div>
      </div>
      <div className="nav-links">
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About</a>
        <a href="#facilities" onClick={(e) => { e.preventDefault(); scrollToSection("facilities"); }}>Facilities</a>
        <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }}>Experience</a>
        <a href="#schedule" onClick={(e) => { e.preventDefault(); scrollToSection("schedule"); }}>Schedule</a>
        <a href="#rates" onClick={(e) => { e.preventDefault(); scrollToSection("rates"); }}>Rates</a>
        <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection("location"); }}>Location</a>
        <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}>FAQ</a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfHz8PXEdgZu6n9eab-6m1fP-B3AW7tpkKysnrAdQtCBD6_tw/formResponse" target="_blank" rel="noopener noreferrer" className="nav-book">Book Now</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(15,15,20,0.4), rgba(15,15,20,0.85)), url(${IMAGES.heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="hero-content">
        <span className="hero-tag">MaPSA Holistic Development Center</span>
        <h1 className="hero-title">Where Stillness</h1>
        <span className="hero-title-accent">Meets Purpose</span>
        <p className="hero-sub">
          Nestled in the serene hills of Silang-Tagaytay, MHDC is a sanctuary
          for retreats, conferences, workshops, and camps — where the natural
          world restores and the spirit is renewed.
        </p>
        {/* <div className="hero-cta">
          <a href="#booknow" className="btn-primary"><span>Reserve Your Retreat</span></a>
          <a href="#about" className="btn-ghost">Discover MHDC</a>
        </div> */}
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-mouse"></div>
        <span className="scroll-text">SCROLL</span>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="stats-bar">
      {STATS.map((s, i) => (
        <div key={i} className="stat-item">
          <span className="stat-num"><Counter target={s.num} suffix={s.suffix} /></span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-visual reveal-left">
          <img src={IMAGES.about} alt="MHDC Development Center" className="about-img" />
          <div className="about-badge">
            <span className="b-num">5★</span>
            <span className="b-lbl">Experience</span>
          </div>
        </div>
        <div className="about-text reveal-right" data-delay="150">
          <span className="section-label">About MHDC</span>
          <h2 className="section-title">A <em>Holistic</em> Haven<br />in Nature</h2>
          <p className="section-body">
            Located in the scenic Silang-Tagaytay area, the MaPSA Holistic
            Development Center offers versatile venues for workshops, trainings,
            retreats, camps, and team-building. The center is managed by a
            dedicated team that courteously works with organizers to customize
            venue setup for a seamless, smooth, and successful event.
          </p>
          <p className="section-body" style={{ marginTop: 18 }}>
            Surrounded by fresh air, natural beauty, and a calming mini-forest,
            MHDC provides an ideal setting to relax, recharge, and find peace in
            nature — nurturing the mind, body, and spirit for every guest.
          </p>
          <div className="feature-tags">
            {FEATURE_TAGS.map((t) => <span key={t} className="feature-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function NatureBreak() {
  return (
    <div className="nature-break">
      <NatureBreakCanvas />
      <div className="nature-break-text">
        <p className="nature-break-quote">
          "In every walk with nature, one receives far more than <em>he seeks.</em>"
        </p>
        <p className="nature-break-attr">— John Muir</p>
      </div>
    </div>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="facilities-section bg-dark">
      <div className="facilities-header reveal">
        <span className="section-label">Our Facilities</span>
        <h2 className="section-title">Everything You <em>Need</em></h2>
        <p className="section-body" style={{ margin: "0 auto" }}>
          World-class amenities designed for comfort, productivity, and spiritual renewal.
        </p>
      </div>
      <div className="facilities-grid">
        {FACILITIES.map((f, i) => (
          <div key={i} className="facility-card">
            <img src={f.img} alt={f.title} />
            <div className="facility-overlay">
              <div className="facility-icon">{f.icon}</div>
              <h3 className="facility-title">{f.title}</h3>
              <div className="facility-line" />
              <p className="facility-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">
        <div>
          <span className="section-label reveal">What We Offer</span>
          <h2 className="section-title reveal" data-delay="100">
            Experiences <em>Crafted</em><br />for Every Group
          </h2>
          <div className="exp-list">
            {EXPERIENCES.map((item, i) => (
              <div key={i} className="exp-item">
                <span className="exp-num">0{i + 1}</span>
                <div className="exp-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="exp-visual reveal-right" data-delay="200">
          <img src={IMAGES.experience} alt="MHDC Experience" />
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="schedule-section">
      <div className="schedule-inner">
        <div className="schedule-header reveal">
          <span className="section-label">A Day at MHDC</span>
          <h2 className="section-title">Typical <em>Retreat</em> Schedule</h2>
          <p className="section-body">
            While every retreat is customized to your group's unique goals, here is a glimpse into what a typical day looks like at our center.
          </p>
        </div>
        <div className="timeline">
          {SCHEDULE.map((item, i) => (
            <div key={i} className="timeline-item reveal" data-delay={i * 100}>
              <div className="timeline-dot"></div>
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <div className="faq-text reveal-left">
          <span className="section-label">Questions?</span>
          <h2 className="section-title">Frequently Asked<br /><em>Questions</em></h2>
          <p className="section-body">
            Planning a retreat can be complex. We're here to make it simple. Browse our most common questions below.
          </p>
        </div>
        <div className="faq-list reveal-right" data-delay="150">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIdx === i ? 'open' : ''}`}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            >
              <div className="faq-q">
                <span>{faq.q}</span>
                <div className="faq-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M19 9l-7 7-7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="faq-a">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Rates() {
  return (
    <section id="rates" className="rates-section">
      <div className="rates-inner">
        <div className="rates-header reveal">
          <span className="section-label">Transparent Pricing</span>
          <h2 className="section-title">Our <em>Rates</em></h2>
          <p className="section-body" style={{ margin: "0 auto", textAlign: "center" }}>
            The MaPSA Holistic Development Center offers versatile event spaces managed by a dedicated team
            that customizes venue setup to ensure a seamless, smooth, and meaningful event.
          </p>
        </div>
        <div className="rates-table-wrap reveal" data-delay="150">
          <table className="rates-table">
            <thead>
              <tr>
                <th rowSpan="2">Room</th>
                <th colSpan="2">Rate per Person per Day</th>
              </tr>
              <tr>
                <th>Without Aircon</th>
                <th>With Aircon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dormitory</td>
                <td>₱1,300.00</td>
                <td>₱1,400.00</td>
              </tr>
              <tr>
                <td>Twin Sharing</td>
                <td>₱1,600.00</td>
                <td>₱1,800.00</td>
              </tr>
              <tr>
                <td>Single Room</td>
                <td>₱1,700.00</td>
                <td>₱1,900.00</td>
              </tr>
              <tr>
                <td>Conference Room (Big) — 160 pax</td>
                <td className="rates-na">**</td>
                <td className="rates-highlight">₱2,500 / day</td>
              </tr>
              <tr>
                <td>Conference Room (Small) — 60 pax</td>
                <td className="rates-na">**</td>
                <td className="rates-highlight">₱1,500 / day</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rates-inclusions reveal" data-delay="200">
          <h3 className="rates-inc-title">Package Inclusions</h3>
          <ul className="rates-inc-list">
            <li>PM Snacks, Dinner, Breakfast, AM Snacks, and Lunch</li>
            <li>Conference Room <em>(Non-Airconditioned)**</em></li>
            <li>Audio-Visual Equipment: Sound System, Microphone, TV</li>
            <li>Complimentary Wi-Fi internet connection for five (5) devices</li>
            <li>For groups of at least 50 pax, the Resource Person or Retreat Master is <strong>FREE</strong> for the whole duration of stay</li>
          </ul>
          <p className="rates-tagline">"Experience a peaceful, affordable, and well-equipped venue for your seminars, retreats, trainings, and gatherings!"</p>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="location-section">
      <span className="section-label reveal">Find Us</span>
      <h2 className="section-title reveal" data-delay="100">Our <em>Location</em></h2>
      <p className="location-address reveal" data-delay="150">
        <strong>Brgy. Pasong Langka,</strong> Sta. Rosa–Tagaytay Road,<br />
        Silang, Cavite, Philippines
      </p>
      <div className="map-wrap reveal" data-delay="200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.3!2d120.97!3d14.226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6e6b00000001%3A0x0!2sMaPSA+Holistic+Development+Center%2C+Barangay+Pasong+Langka%2C+Santa+Rosa-Tagaytay+Rd%2C+Silang%2C+4118+Cavite%2C+Philippines!5e0!3m2!1sen!2sph!4v1700000000000"
          width="100%" height="420" style={{ border: 0 }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MHDC Location"
        />
      </div>
      <div className="social-row reveal" data-delay="300">
        <a href="https://www.facebook.com/mapsahdc" target="_blank" rel="noopener noreferrer" className="social-btn">
          <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
          Facebook Page
        </a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfHz8PXEdgZu6n9eab-6m1fP-B3AW7tpkKysnrAdQtCBD6_tw/formResponse" target="_blank" rel="noopener noreferrer" className="social-btn">
          <svg viewBox="0 0 24 24"><path d="M20 12V22H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" /></svg>
          Book Now
        </a>
      </div>
    </section>
  );
}

function BookNow() {
  return (
    <section id="booknow" className="booknow-section">
      <div className="booknow-inner">
        <div className="booknow-left reveal-left">
          <span className="section-label">Make a Reservation</span>
          <h2 className="section-title">Reserve Your<br /><em>Retreat</em></h2>
          <p className="section-body">
            Experience a peaceful, affordable, and well-equipped venue for your
            seminars, retreats, trainings, and gatherings. Get in touch with our
            team — we respond within 24 hours.
          </p>
          <div className="booknow-contacts">
            <a href="tel:09086198471" className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 013 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className="contact-detail">
                <span className="contact-label">Call Us</span>
                <span className="contact-value">0908 619 8471</span>
              </div>
            </a>
            <a href="mailto:mhdc@mapsa.edu.ph" className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-detail">
                <span className="contact-label">Email Us</span>
                <span className="contact-value">mhdc@mapsa.edu.ph</span>
              </div>
            </a>
            <a href="https://www.facebook.com/mapsahdc" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
              <div className="contact-detail">
                <span className="contact-label">Follow Us</span>
                <span className="contact-value">facebook.com/mapsahdc</span>
              </div>
            </a>
            <a href="https://www.mapsahdc.com" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <div className="contact-detail">
                <span className="contact-label">Website</span>
                <span className="contact-value">www.mapsahdc.com</span>
              </div>
            </a>
          </div>
        </div>
        <div className="booknow-right reveal-right" data-delay="150">
          <div className="inclusions-card">
            {/* Gold header band */}
            <div className="inc-card-header">
              <p className="inc-card-header-label">What's included</p>
              <h3 className="inc-card-title"><strong>Package Inclusions</strong></h3>
            </div>

            <div className="inc-card-body">
              <p className="inc-card-sub">All packages come with the following</p>

              <ul className="inc-card-list">
                <li>
                  <div className="inc-list-icon">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="inc-list-text">PM Snacks, Dinner, Breakfast, AM Snacks &amp; Lunch</span>
                </li>
                <li>
                  <div className="inc-list-icon">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="inc-list-text">Conference Room <em>(Non-Airconditioned)</em></span>
                </li>
                <li>
                  <div className="inc-list-icon">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="inc-list-text">Audio-Visual Equipment: Sound System, Microphone, TV</span>
                </li>
                <li>
                  <div className="inc-list-icon">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="inc-list-text">Complimentary Wi-Fi for five (5) devices</span>
                </li>
              </ul>

              <div className="inc-card-divider" />

              {/* Free badge for 50+ pax */}
              <div className="inc-free-badge">
                <span className="inc-free-badge-tag">FREE</span>
                <span className="inc-free-badge-text">
                  <strong>Resource Person / Retreat Master</strong> — included at no cost for groups of 50+ pax
                </span>
              </div>

              <a href="https://mail.google.com/mail/?view=cm&to=mhdc@mapsa.edu.ph&su=Booking+Inquiry+%E2%80%94+MHDC" target="_blank" rel="noopener noreferrer" className="btn-primary inc-cta"><span>Send a Booking Inquiry</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo-text" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }} onClick={() => scrollToSection("hero")}>
            <img src={IMAGES.logo} alt="MHDC Logo" style={{ height: "48px", width: "auto", borderRadius: "10px" }} />
            MHDC
          </div>
          <p className="footer-tagline">MaPSA Holistic Development Center</p>
          <p className="footer-addr">Brgy. Pasong Langka, Sta. Rosa–Tagaytay Road,<br />Silang, Cavite, Philippines</p>
        </div>
        <div className="footer-nav">
          <p className="footer-nav-title">Navigation</p>
          <div className="footer-links">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About</a>
            <a href="#facilities" onClick={(e) => { e.preventDefault(); scrollToSection("facilities"); }}>Facilities</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }}>Experience</a>
            <a href="#schedule" onClick={(e) => { e.preventDefault(); scrollToSection("schedule"); }}>Schedule</a>
            <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection("location"); }}>Location</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}>FAQ</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfHz8PXEdgZu6n9eab-6m1fP-B3AW7tpkKysnrAdQtCBD6_tw/formResponse" target="_blank" rel="noopener noreferrer">Book Now</a>
          </div>
        </div>
        <div className="footer-contact">
          <p className="footer-nav-title">Contact</p>
          <a href="tel:09086198471" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 013 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            0908 619 8471
          </a>
          <a href="mailto:mhdc@mapsa.edu.ph" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            mhdc@mapsa.edu.ph
          </a>
          <a href="https://www.mapsahdc.com" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
            www.mapsahdc.com
          </a>
          <a href="https://www.facebook.com/mapsahdc" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            facebook.com/mapsahdc
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MaPSA Holistic Development Center. All rights reserved.</p>
        <p>Developed by: <a href="https://sean-m.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-dev-link">Sean Morales</a></p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const canvasRef = useRef(null);
  const scrolled = useScrolled(60);

  useScrollReveal();
  useThreeScene(canvasRef);
  useGSAPAnimations();

  return (
    <>
      <canvas id="three-canvas" ref={canvasRef} />
      <div className="app">
        <Navbar scrolled={scrolled} />
        <Hero />
        <About />
        <NatureBreak />
        <Facilities />
        <Experience />
        <Schedule />
        <Location />
        <FAQ />
        <BookNow />
        <Footer />
      </div>
    </>
  );
}