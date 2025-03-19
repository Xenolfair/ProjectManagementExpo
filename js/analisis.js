// ------- Osmo [https://osmo.supply/] ------- //

document.addEventListener("DOMContentLoaded", () => {
	// Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);
  // Parallax Layers
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });
    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 }
    ];
    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });
});
/* Lenis */
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {lenis.raf(time * 1000);});
gsap.ticker.lagSmoothing(0);



/* Parte de cards*/
class Pixel {
    constructor(canvas, context, x, y, color, speed, delay) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = context;
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = this.getRandomValue(0.1, 0.9) * speed;
      this.size = 0;
      this.sizeStep = Math.random() * 0.4;
      this.minSize = 0.5;
      this.maxSizeInteger = 2;
      this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
      this.delay = delay;
      this.counter = 0;
      this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
      this.isIdle = false;
      this.isReverse = false;
      this.isShimmer = false;
    }
  
    getRandomValue(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    draw() {
      const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
  
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(
        this.x + centerOffset,
        this.y + centerOffset,
        this.size,
        this.size
      );
    }
  
    appear() {
      this.isIdle = false;
  
      if (this.counter <= this.delay) {
        this.counter += this.counterStep;
        return;
      }
  
      if (this.size >= this.maxSize) {
        this.isShimmer = true;
      }
  
      if (this.isShimmer) {
        this.shimmer();
      } else {
        this.size += this.sizeStep;
      }
  
      this.draw();
    }
  
    disappear() {
      this.isShimmer = false;
      this.counter = 0;
  
      if (this.size <= 0) {
        this.isIdle = true;
        return;
      } else {
        this.size -= 0.1;
      }
  
      this.draw();
    }
  
    shimmer() {
      if (this.size >= this.maxSize) {
        this.isReverse = true;
      } else if (this.size <= this.minSize) {
        this.isReverse = false;
      }
  
      if (this.isReverse) {
        this.size -= this.speed;
      } else {
        this.size += this.speed;
      }
    }
  }
  
  class PixelCanvas extends HTMLElement {
    static register(tag = "pixel-canvas") {
      if ("customElements" in window) {
        customElements.define(tag, this);
      }
    }
  
    static css = `
      :host {
        display: grid;
        inline-size: 100%;
        block-size: 100%;
        overflow: hidden;
      }
    `;
  
    get colors() {
      return this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"];
    }
  
    get gap() {
      const value = this.dataset.gap || 5;
      const min = 4;
      const max = 50;
  
      if (value <= min) {
        return min;
      } else if (value >= max) {
        return max;
      } else {
        return parseInt(value);
      }
    }
  
    get speed() {
      const value = this.dataset.speed || 35;
      const min = 0;
      const max = 100;
      const throttle = 0.001;
  
      if (value <= min || this.reducedMotion) {
        return min;
      } else if (value >= max) {
        return max * throttle;
      } else {
        return parseInt(value) * throttle;
      }
    }
  
    get noFocus() {
      return this.hasAttribute("data-no-focus");
    }
  
    connectedCallback() {
      const canvas = document.createElement("canvas");
      const sheet = new CSSStyleSheet();
  
      this._parent = this.parentNode;
      this.shadowroot = this.attachShadow({ mode: "open" });
  
      sheet.replaceSync(PixelCanvas.css);
  
      this.shadowroot.adoptedStyleSheets = [sheet];
      this.shadowroot.append(canvas);
      this.canvas = this.shadowroot.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.timeInterval = 1000 / 60;
      this.timePrevious = performance.now();
      this.reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
  
      this.init();
      this.resizeObserver = new ResizeObserver(() => this.init());
      this.resizeObserver.observe(this);
  
      this._parent.addEventListener("mouseenter", this);
      this._parent.addEventListener("mouseleave", this);
  
      if (!this.noFocus) {
        this._parent.addEventListener("focusin", this);
        this._parent.addEventListener("focusout", this);
      }
    }
  
    disconnectedCallback() {
      this.resizeObserver.disconnect();
      this._parent.removeEventListener("mouseenter", this);
      this._parent.removeEventListener("mouseleave", this);
  
      if (!this.noFocus) {
        this._parent.removeEventListener("focusin", this);
        this._parent.removeEventListener("focusout", this);
      }
  
      delete this._parent;
    }
  
    handleEvent(event) {
      this[`on${event.type}`](event);
    }
  
    onmouseenter() {
      this.handleAnimation("appear");
    }
  
    onmouseleave() {
      this.handleAnimation("disappear");
    }
  
    onfocusin(e) {
      if (e.currentTarget.contains(e.relatedTarget)) return;
      this.handleAnimation("appear");
    }
  
    onfocusout(e) {
      if (e.currentTarget.contains(e.relatedTarget)) return;
      this.handleAnimation("disappear");
    }
  
    handleAnimation(name) {
      cancelAnimationFrame(this.animation);
      this.animation = this.animate(name);
    }
  
    init() {
      const rect = this.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
  
      this.pixels = [];
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.createPixels();
    }
  
    getDistanceToCanvasCenter(x, y) {
      const dx = x - this.canvas.width / 2;
      const dy = y - this.canvas.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      return distance;
    }
  
    createPixels() {
      for (let x = 0; x < this.canvas.width; x += this.gap) {
        for (let y = 0; y < this.canvas.height; y += this.gap) {
          const color = this.colors[
            Math.floor(Math.random() * this.colors.length)
          ];
          const delay = this.reducedMotion
            ? 0
            : this.getDistanceToCanvasCenter(x, y);
  
          this.pixels.push(
            new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
          );
        }
      }
    }
  
    animate(fnName) {
      this.animation = requestAnimationFrame(() => this.animate(fnName));
  
      const timeNow = performance.now();
      const timePassed = timeNow - this.timePrevious;
  
      if (timePassed < this.timeInterval) return;
  
      this.timePrevious = timeNow - (timePassed % this.timeInterval);
  
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      for (let i = 0; i < this.pixels.length; i++) {
        this.pixels[i][fnName]();
      }
  
      if (this.pixels.every((pixel) => pixel.isIdle)) {
        cancelAnimationFrame(this.animation);
      }
    }
  }
  
  PixelCanvas.register();





                                                                            // Part Angel y Alejandro
  'use strict';

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}


// Parte de Angel y Alejandro
function changeSection(targetPage, button) {
  const articles = document.querySelectorAll("article");
  const navLinks = document.querySelectorAll(".navbar-link");

  // Quitar "active" de todos los artículos y botones
  articles.forEach(article => article.classList.remove("active"));
  navLinks.forEach(nav => nav.classList.remove("active"));

  // Agregar "active" solo al artículo y botón correspondiente
  document.querySelector(`article[data-page="${targetPage}"]`).classList.add("active");
  button.classList.add("active");
}