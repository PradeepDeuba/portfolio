/**
 * Project catalogue — real work only.
 *
 * Sources:
 *   - "ESP32 Car" comes from the live site's Supabase `projects` table, verbatim.
 *   - The other three correspond to real public repositories on the owner's
 *     GitHub, and their descriptions are the owner's own words, taken from the
 *     opening of the matching blog post. Nothing here was written from scratch
 *     or embellished.
 *
 * `tags` are the technologies that genuinely appear in the corresponding post
 * (shift registers, I²C/SPI, TDS sensing, and so on) rather than a generic list.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  /** In-app route for the write-up. */
  demoUrl?: string;
  /** Real public repository. */
  githubUrl?: string;
  /** Slug of the matching post, when one exists. */
  postSlug?: string;
}

export const projects: Project[] = [
  {
    id: "esp32-car",
    title: "ESP32 Car",
    description:
      "A smart Bluetooth-controlled car powered by ESP32, allowing wireless movement control via a mobile app, with real-time speed adjustment and direction switching.",
    image: "https://i.imgur.com/3uW3sRC.jpeg",
    tags: ["ESP32", "Bluetooth", "C++", "Motor Control"],
    demoUrl: "/projects/esp32-car",
    githubUrl: "https://github.com/PradeepDeuba68",
  },
  {
    id: "esp32-water-monitoring",
    title: "ESP32 Water Quality & Level Monitoring",
    description:
      "An in-tank rig that answers three questions from a phone: how much water is left, how clean it is, and whether the pump is doing its job.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
    tags: ["ESP32", "TDS", "DS18B20", "HC-SR04", "OneWire"],
    demoUrl: "/projects/esp32-water-monitoring",
    githubUrl: "https://github.com/PradeepDeuba68/ESP32-Water-Monitoring-System-",
    postSlug: "esp32-water-quality-monitoring",
  },
  {
    id: "diy-7-segment-clock",
    title: "DIY 7-Segment Digital Clock",
    description:
      "A large-format 7-segment clock built the hard way — shift registers, current-sinking drivers and a multiplex loop written from scratch.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    tags: ["74HC595", "ULN2803", "Multiplexing", "ATmega"],
    demoUrl: "/projects/diy-7-segment-clock",
    githubUrl: "https://github.com/PradeepDeuba68/DIY-7-Segment-Digital-Clock",
    postSlug: "diy-7-segment-digital-clock",
  },
  {
    id: "oled-animation-esp32-c3",
    title: "OLED Animation on ESP32-C3",
    description:
      "Squeezing a smooth 60 fps animation out of a 128×64 SSD1306 OLED on an ESP32-C3, by moving off I²C and rethinking how frames are pushed.",
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=80",
    tags: ["ESP32-C3", "SSD1306", "SPI", "DMA", "GFX"],
    demoUrl: "/projects/oled-animation-esp32-c3",
    githubUrl:
      "https://github.com/PradeepDeuba68/OLED-Animation-on-ESP32-C3-with-0.96-OLED-Display",
    postSlug: "oled-animation-esp32-c3",
  },
];

export const featuredProjects = projects.slice(0, 3);

export const getProjectById = (id?: string): Project | undefined =>
  projects.find((project) => project.id === id);

/** Every tag used across the catalogue, for filter controls and marquees. */
export const allTags: string[] = Array.from(
  new Set(projects.flatMap((project) => project.tags))
);
