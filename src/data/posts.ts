/**
 * Blog catalogue.
 *
 * GENERATED from the live portfolio's Supabase `posts` table — the titles,
 * excerpts, cover images, read times, dates and full markdown bodies are the
 * real posts, copied verbatim. Regenerate rather than hand-editing if the
 * source changes.
 *
 * `topics` is the one field that is NOT from the source data: the table has no
 * category column, so these are editorial groupings assigned by reading each
 * post. Change them freely.
 */
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  /** Markdown, rendered by src/lib/markdown.tsx. */
  content: string;
  cover: string;
  date: string;
  readTime: string;
  topics: string[];
}

export const posts: Post[] = [
  {
    id: "esp32-water-quality-monitoring",
    title: "Smart ESP32 Water Quality & Level Monitoring System",
    excerpt: "A hands-on walkthrough of building an ESP32-based water monitoring rig: TDS, temperature, ultrasonic level sensing, and live cloud dashboards.",
    cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
    date: "10 July 2026",
    readTime: "9 min read",
    topics: ["Sensors", "IoT", "ESP32"],
    content: `
Clean water is one of those quiet infrastructure problems most of us never think about — until a tank runs dry, a pump burns out, or a family member gets sick from bad water. After moving back to Kathmandu I got tired of climbing the roof to peek into our storage tank, and I started building a small ESP32-based rig to answer three questions from my phone: *How much water is left? How clean is it? Is the pump doing its job?*

## Bill of materials

- **ESP32-WROOM-32** dev board — Wi-Fi + Bluetooth in one chip, plenty of ADC pins.
- **HC-SR04** ultrasonic sensor for tank level (non-contact, doesn't corrode).
- **DS18B20** waterproof temperature probe on a OneWire bus.
- **Gravity Analog TDS Sensor** (DFRobot) for dissolved-solids readings.
- 5 V / 2 A supply, IP65 junction box, and a short pigtail of silicone-jacketed hookup wire.

Total cost was around NPR 3,800 — cheaper than one service call from a plumber, and it runs indefinitely.

## Wiring notes

The TDS probe is analog and hates ADC noise, so I moved it to \`GPIO34\` (input-only, isolated from the noisy Wi-Fi rail) and added a 100 nF ceramic across the sensor's Vcc. The DS18B20 lives on \`GPIO4\` with the classic 4.7 kΩ pull-up to 3V3. The HC-SR04 wants 5 V logic, so its \`ECHO\` line goes through a simple 1 kΩ / 2 kΩ divider before touching \`GPIO18\`.

\`\`\`cpp
#define TDS_PIN   34
#define ONE_WIRE  4
#define TRIG_PIN  5
#define ECHO_PIN  18
\`\`\`

## Reading the sensors

Ultrasonic distance is straightforward — send a 10 µs pulse, time the echo, divide by 58 for centimetres. To convert distance-from-lid into percent-full I calibrated once with a tape measure:

\`\`\`cpp
float pct = 100.0f * (TANK_HEIGHT_CM - distanceCm) / TANK_HEIGHT_CM;
pct = constrain(pct, 0.0f, 100.0f);
\`\`\`

For TDS I average 30 ADC samples, apply the DFRobot temperature compensation formula, and clamp to a sensible range. Raw TDS without temperature compensation drifts by 2 % per °C — meaningful when your tank sits in the sun.

## Sending data to the cloud

I use MQTT over TLS to a HiveMQ broker, publishing a compact JSON payload every 60 seconds:

\`\`\`json
{ "level": 74.2, "tds": 189, "tempC": 21.3, "pump": false }
\`\`\`

On the Node-RED side I persist the readings to InfluxDB and drive a Grafana dashboard. A simple alert rule fires an ntfy notification when TDS crosses 500 ppm (WHO's upper "acceptable" bound) or level drops under 15 %.

## Lessons after six months

- **Seal everything.** My first enclosure fogged up within a week. I now use silica gel packets and vent the box with a Gore-Tex patch.
- **Debounce the pump signal.** Motor start-up spikes tripped my SSR twice; a 3-second confirmation window fixed it.
- **OTA updates are non-negotiable.** Climbing the roof to reflash defeats the whole point. \`ArduinoOTA.begin()\` costs nothing and saves everything.

The finished node has been reporting continuously since April. Next iteration will add a small solar panel and drop the mains PSU entirely.
`,
  },
  {
    id: "diy-7-segment-digital-clock",
    title: "DIY 7-Segment Digital Clock from Scratch",
    excerpt: "Building a large-format 7-segment clock the hard way \u2014 shift registers, current-limited drivers, and an RTC that actually keeps time.",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    date: "10 July 2026",
    readTime: "8 min read",
    topics: ["Hardware", "Displays", "DIY"],
    content: `
Most 7-segment clock tutorials hand you a TM1637 module and call it a day. That's fine, but it hides all the interesting electrical engineering. I wanted a big desk clock with 2.3-inch digits, and at that size you can't just drive segments straight from a microcontroller — you need real current sourcing and multiplexing. Here's how I built one from discrete parts.

## Choosing the display

I picked four common-anode 2.3" red digits (Kingbright SA23-12EWA). Each segment draws about 20 mA at 2 V forward voltage, so a lit "8" pulls roughly 140 mA. That's already too much to sink through a single microcontroller pin, and the anode needs 12 V because there are two LED dies in series per segment.

## Segment sinks with a ULN2803

Each cathode segment (a–g plus decimal) is sunk to ground through a ULN2803 Darlington array. The ULN2803 handles up to 500 mA per channel and includes flyback diodes — perfect for later expansion to relays or motors. Current-limiting resistors sit between each segment and the ULN, sized for \`(Vcc - Vf) / I\`:

\`\`\`
(12V - 4V) / 0.02A = 400 Ω
\`\`\`

I used 390 Ω 1/4 W resistors — one per segment, eight per digit.

## Digit selection with 74HC595 + PNP transistors

Because I'm multiplexing digits, only one anode is active at a time. A 74HC595 shift register drives four BC557 PNP transistors through 4.7 kΩ base resistors. The '595 lets me control all four anodes plus four spare pins with just three lines from the microcontroller (\`DATA\`, \`CLOCK\`, \`LATCH\`). Extending to six digits later is free — just cascade another '595.

## Timing that doesn't drift

The ESP32's internal RTC drifts about a minute per day, which is fine for uptime but embarrassing on a clock. I added a **DS3231** on I²C — accurate to ±2 ppm across the full commercial temperature range, and it keeps time on a CR2032 through power loss. On boot the firmware pulls the current time once, then reads only when redrawing the display.

## Multiplex loop

The core render loop cycles through all four digits at ~200 Hz per digit, giving 800 Hz overall — well above the flicker threshold and comfortably slow for the ULN2803:

\`\`\`cpp
for (uint8_t d = 0; d < 4; d++) {
  writeSegments(digits[d]);   // to ULN via GPIOs
  selectDigit(d);             // to '595 via SPI
  delayMicroseconds(1200);
  selectDigit(0xFF);          // blank
}
\`\`\`

Blanking between digits is the trick that kills ghosting — without it, segment charge from the previous digit bleeds into the next one and every "1" grows a faint tail.

## Enclosure and power

The whole board runs from a 12 V / 1 A wall wart, with a small buck converter dropping to 3.3 V for logic. Everything sits behind a red acrylic panel that hides the un-lit segments and gives that authentic 1970s clock-radio look.

Total parts cost: about NPR 2,200. Time to build: two weekends. Satisfaction of hearing someone ask "wait, you *built* this?": priceless.
`,
  },
  {
    id: "oled-animation-esp32-c3",
    title: "Optimizing OLED Animation Frame Rates on ESP32-C3",
    excerpt: "How to squeeze smooth 60 fps animation out of a 128\u00d764 SSD1306 OLED on the ESP32-C3 \u2014 buffer strategy, SPI vs I\u00b2C, and the Adafruit GFX quirks that matter.",
    cover: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=80",
    date: "10 July 2026",
    readTime: "10 min read",
    topics: ["Displays", "Performance", "ESP32"],
    content: `
The ESP32-C3 is a lovely little chip — RISC-V, single-core, cheap — but its single core and modest RAM budget mean OLED animation can chug if you copy the ESP32 patterns straight across. I recently rebuilt a status dashboard for a battery monitor and had to fight for every frame. Here's what actually moved the needle.

## Baseline: I²C at default speeds

The stock Adafruit_SSD1306 example runs I²C at 100 kHz. A full 1024-byte framebuffer transfer therefore takes \`1024 × 9 / 100000 ≈ 92 ms\` — about 11 fps ceiling before you compute anything. Even bumping to the "fast" 400 kHz preset only gets you 44 fps, and any I²C activity from other sensors instantly steals frames.

## Step 1: switch to hardware SPI

The SSD1306 also speaks 4-wire SPI. On the ESP32-C3 I clock it at 8 MHz using the hardware SPI peripheral. Full-buffer push drops from 92 ms to about 1.2 ms — an 80× improvement — freeing the CPU to actually draw things.

\`\`\`cpp
Adafruit_SSD1306 display(128, 64, &SPI, /*dc*/ 6, /*rst*/ 7, /*cs*/ 5, 8000000);
\`\`\`

The four extra wires are worth it. If I²C is non-negotiable (shared bus, pin scarcity), at least push it to 1 MHz — the SSD1306 tolerates it in practice, even though the datasheet only guarantees 400 kHz.

## Step 2: dirty-rectangle updates

Full-buffer pushes are wasteful when only a small badge is animating. I patched Adafruit_SSD1306 to expose a \`displayWindow(x, y, w, h)\` method that streams only the changed columns. For a 32×16 progress bar animation this drops the per-frame cost from 1.2 ms to about 90 µs, and the CPU idles between frames instead of stalling on SPI.

## Step 3: watch out for GFX allocations

\`drawString()\` in Adafruit_GFX with a custom font allocates a temporary bitmap for each glyph. On a 320 kB RAM budget that's fine; on the ESP32-C3's ~380 kB it's fine too — until you also allocate a Wi-Fi stack. I ran out of heap after five minutes of continuous animation because free-list fragmentation eventually refused to give me a 128-byte contiguous block. The fix was to pre-render fixed strings into \`PROGMEM\` bitmaps and blit them with \`drawBitmap\`. Zero heap churn, and rendering is faster to boot.

## Step 4: decouple animation from work

The critical mental shift is treating the display as a *consumer*, not a *producer*. I run a FreeRTOS timer at 60 Hz that swaps a double-buffered scene into the framebuffer, and a separate lower-priority task that recomputes the scene as sensor data arrives. The display timer never blocks on I/O — worst case it re-renders last frame.

## Measured results

| Config              | Full-buffer refresh | Achievable fps |
| ------------------- | ------------------- | -------------- |
| I²C @ 100 kHz       | 92 ms               | 10             |
| I²C @ 400 kHz       | 23 ms               | 43             |
| SPI @ 8 MHz         | 1.2 ms              | 60+ (capped)   |
| SPI + dirty rects   | 0.09 ms             | 60+ (idle)     |

Sixty frames per second on a $2 microcontroller with a $4 screen. The tricks aren't glamorous — they're just about not doing work you don't need to do.
`,
  },
  {
    id: "manual-dpf-regeneration-guide",
    title: "How to Safely Perform Manual DPF Regeneration on Modern Diesel Vehicles",
    excerpt: "A cautious, mechanic-informed walkthrough for manually triggering a diesel particulate filter regeneration \u2014 what to check, what to watch for, and when to stop and call a professional.",
    cover: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
    date: "10 July 2026",
    readTime: "11 min read",
    topics: ["Automotive", "Diagnostics"],
    content: `
> **Disclaimer:** Modern emissions systems run hot, hold high pressures, and interact with engine ECU logic in non-obvious ways. This article is a walkthrough of the process a qualified technician would follow. If you don't have a scan tool, a fire extinguisher, and a solid understanding of your specific vehicle's service manual, take the car to a workshop instead.

The **diesel particulate filter (DPF)** traps soot from your exhaust so it doesn't reach the atmosphere. Under normal driving the ECU periodically raises exhaust gas temperature to burn the trapped soot into ash — this is *passive* or *active* regeneration, and you'll never notice it. But short trips, cold weather, and low-quality fuel can leave the DPF chronically clogged, and eventually the ECU throws a dashboard warning demanding a **forced (manual) regeneration**.

## Before you start: five checks

1. **Fuel level above ¼ tank.** A regen burns extra diesel — sometimes 2–3 litres.
2. **Engine oil not overdue.** Regen dumps unburnt fuel into the oil past the piston rings. If your oil is already at service interval, change it first and change it again after regen.
3. **No other pending faults.** A stored EGR, boost, or MAF fault will abort the regen and waste your time. Clear the underlying issue first.
4. **Coolant at operating range.** The ECU refuses to start regen on a cold engine.
5. **Outdoor location, clear of anything flammable.** The exhaust tip reaches 600–650 °C during regen. That's hot enough to ignite dry grass, plastic, or a fuel spill.

## Step 1: read the DPF live data

Plug in your scan tool (OBDLink, Autel, or manufacturer-specific) and pull the DPF module. You're looking for four numbers:

- **Soot mass (measured)** — the ECU's estimate of grams of soot in the filter.
- **Ash mass** — permanent residue; regen doesn't remove it.
- **Distance since last regen.**
- **Exhaust temperature (pre- and post-DPF).**

If soot is under 25 g on most 1.6–2.0 L Euro engines, a manual regen may not even be needed — an extended highway drive at 2500 rpm for 20 minutes might complete a passive regen. If soot is over 45 g, most manufacturers **prohibit** manual regen and require the DPF to be dropped and cleaned professionally. Don't override this. A DPF ignited above the soot limit can crack the substrate — a very expensive lesson.

## Step 2: enter service mode

The exact procedure depends on your vehicle and scan tool. Broadly:

1. Park on level ground, transmission in Park/Neutral, parking brake set.
2. On the scan tool, navigate to *Engine → Service Functions → DPF Regeneration*.
3. Follow the pre-conditions checklist (doors closed, hood open, no accessories).
4. Confirm start. The ECU raises idle to ~1400 rpm and injects late post-injection pulses to raise EGT.

## Step 3: monitor, don't wander

For the next 15–25 minutes, stay with the vehicle. Watch **post-DPF EGT** — it should rise steadily to 550–650 °C and hold. If EGT stalls under 500 °C or fluctuates wildly, abort. Watch soot mass tick down; if it plateaus for more than 5 minutes, abort. Watch coolant temp; if it climbs past 105 °C, abort and let the engine cool.

## Step 4: completion and cool-down

A successful regen ends with the ECU dropping idle back to normal and resetting the soot counter to near zero. **Do not switch off immediately.** Let the engine idle for at least 3 minutes so the DPF and turbo cool below auto-ignition temperature. Then take the vehicle on a 15-minute drive to ventilate remaining smoke through the exhaust.

## Step 5: post-regen housekeeping

- Check the oil level and smell. Fuel-diluted oil smells sharp and reads slightly high on the dipstick — change it.
- Log the regen event in your service book with mileage, soot before, soot after, and duration.
- If regens are needed more than once every 800 km, the underlying cause (short trips, failing injector, EGR issue, low-quality fuel) needs investigation — chronic regens burn out the DPF substrate faster than they clear it.

Done carefully, a manual regen is a routine maintenance operation. Done casually, it's a house fire in the driveway. Respect the temperatures, follow the manufacturer's service data, and know when to stop.
`,
  },
];

/** Every topic across the catalogue, for the blog filter. */
export const topics: string[] = Array.from(
  new Set(posts.flatMap((post) => post.topics))
);

export const getPostById = (id?: string): Post | undefined =>
  posts.find((post) => post.id === id);

