import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateGridItems } from "./section-animations";
import { maskTextRevealVertical } from "./text-animations";

export function animateServicesSection(): ScrollTrigger[] {
  // ScrollTrigger.config() centralizado en gsap-config.ts (single source of truth).
  const triggers: ScrollTrigger[] = [];
  const servicesSection = document.querySelector("#services");
  if (!servicesSection) return triggers;

  const logo = servicesSection.querySelector("img");
  const claim = servicesSection.querySelector("h2");
  const paragraphs = servicesSection.querySelectorAll(".paragraph-1, .paragraph-2");
  const gridContainer = servicesSection.querySelector(".services-grid");
  const separator = document.querySelector("#process-separator");
  const cards = Array.from(servicesSection.querySelectorAll(".service-card"));

  const mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isMobile, reduceMotion } = context.conditions as {
        isMobile: boolean;
        reduceMotion: boolean;
      };

      if (reduceMotion) return;

      if (logo) {
        const t = gsap.from(logo, {
          y: 60,
          autoAlpha: 0,
          force3D: true,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logo,
            start: "top 90%",
          },
        });
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      }

      if (claim) {
        const claimAnim = maskTextRevealVertical(claim, {
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: claim,
            start: "top 80%",
          },
        });
        // @ts-ignore
        if (claimAnim.scrollTrigger) triggers.push(claimAnim.scrollTrigger);
      }

      paragraphs.forEach((p) => {
        const t = gsap.from(p, {
          y: 40,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
          },
        });
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      });

      if (gridContainer) {
        if (isMobile) {
          const gridTrigger = animateGridItems(gridContainer, {
            itemsSelector: ".service-card",
            start: "top 80%",
          });
          if (gridTrigger) triggers.push(gridTrigger);
        } else {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gridContainer,
              start: "top 80%",
            },
          });

          const cardAnimations = [
            { el: cards[0], props: { rotate: 6 }, pos: "cardsStart" },
            { el: cards[2], props: { rotate: -6 }, pos: "cardsStart" },
            { el: cards[1], props: { rotate: 0 }, pos: "cardsStart+=0.2" },
          ];

          tl.addLabel("cardsStart", "-=0.1");

          cardAnimations.forEach(({ el, props, pos }) => {
            if (el) {
              tl.fromTo(
                el,
                { y: 100, autoAlpha: 0, ...props },
                {
                  y: 0,
                  autoAlpha: 1,
                  rotate: 0,
                  force3D: true,
                  duration: 1.0,
                  ease: "power3.out",
                },
                pos
              );
            }
          });

          if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
        }
      }

      if (separator) {
        const t = gsap.from(separator, {
          y: 50,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: separator,
            start: "top 85%",
          },
        });
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      }
    }
  );
  return triggers;
}