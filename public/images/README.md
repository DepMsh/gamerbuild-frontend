# GamerBuild Product Images

## How to add images

1. Find the official product image (PNG with transparent background preferred)
   - Best sources: manufacturer website (asus.com, msi.com, nvidia.com, corsair.com, etc)
   - PCPartPicker product pages (right-click image > Save As)
   - Google Images: search "[product name] png transparent"

2. Save the image as: `public/images/{category}/{component-id}.png`

3. Run: `node scripts/update-images.cjs`
   This auto-updates db.js with the correct image paths.

4. Rebuild: `npm run build && npx vercel --prod`

## Image Guidelines
- Format: PNG (transparent background) or JPG (white background)
- Size: ~300-500px wide is enough
- Clean product photo only (no watermarks, no background clutter)
- Official manufacturer render is best

## Component IDs Reference

### CPU (17) - save to `public/images/cpu/`
| File | Product |
|------|---------|
| cpu-1.png | AMD Ryzen 9 9950X3D |
| cpu-2.png | AMD Ryzen 9 9900X3D |
| cpu-3.png | AMD Ryzen 7 9800X3D |
| cpu-4.png | AMD Ryzen 5 9600X |
| cpu-5.png | Intel Core Ultra 9 285K |
| cpu-6.png | Intel Core Ultra 7 265K |
| cpu-7.png | Intel Core Ultra 5 245K |
| cpu-8.png | AMD Ryzen 7 7800X3D |
| cpu-9.png | AMD Ryzen 5 7600X |
| cpu-10.png | Intel Core i7-14700K |
| cpu-11.png | Intel Core i5-14600K |
| cpu-12.png | AMD Ryzen 9 7950X |
| cpu-13.png | Intel Core i9-14900K |
| cpu-14.png | AMD Ryzen 5 5600X |
| cpu-15.png | Intel Core i3-14100F |
| cpu-16.png | AMD Ryzen 7 5800X3D |
| cpu-17.png | Intel Core i5-13600K |

### GPU (26) - save to `public/images/gpu/`
| File | Product |
|------|---------|
| gpu-1.png | NVIDIA RTX 5090 |
| gpu-2.png | NVIDIA RTX 5080 |
| gpu-3.png | NVIDIA RTX 5070 Ti |
| gpu-4.png | NVIDIA RTX 5070 |
| gpu-5.png | AMD RX 9070 XT |
| gpu-6.png | AMD RX 9070 |
| gpu-9.png | NVIDIA RTX 4090 |
| gpu-10.png | NVIDIA RTX 4080 Super |
| gpu-11.png | NVIDIA RTX 4070 Ti Super |
| gpu-12.png | NVIDIA RTX 4070 Super |
| gpu-13.png | NVIDIA RTX 4060 Ti |
| gpu-14.png | NVIDIA RTX 4060 |
| gpu-15.png | AMD RX 7900 XTX |
| gpu-16.png | AMD RX 7800 XT |
| gpu-17.png | AMD RX 7600 |
| gpu-18.png | NVIDIA RTX 5060 Ti 16GB |
| gpu-19.png | NVIDIA RTX 5060 Ti 8GB |
| gpu-20.png | NVIDIA RTX 5060 |
| gpu-21.png | NVIDIA RTX 3090 24GB |
| gpu-22.png | NVIDIA RTX 3080 Ti 12GB |
| gpu-23.png | NVIDIA RTX 3080 10GB |
| gpu-24.png | NVIDIA RTX 3070 Ti 8GB |
| gpu-25.png | NVIDIA RTX 3070 8GB |
| gpu-26.png | NVIDIA RTX 3060 Ti 8GB |
| gpu-27.png | NVIDIA RTX 3060 12GB |
| gpu-28.png | NVIDIA GTX 1660 Super 6GB |

### Motherboard (16) - save to `public/images/motherboard/`
| File | Product |
|------|---------|
| mb-1.png | ASUS ROG Strix X870E-E WiFi |
| mb-2.png | MSI MAG X870 Tomahawk WiFi |
| mb-3.png | Gigabyte B850 AORUS Elite WiFi7 |
| mb-4.png | MSI MAG B650 Tomahawk WiFi |
| mb-5.png | ASUS ROG Strix Z890-E WiFi |
| mb-6.png | MSI MAG Z890 Tomahawk WiFi |
| mb-7.png | MSI PRO B860M-A WiFi |
| mb-8.png | ASUS ROG Maximus Z790 Hero |
| mb-9.png | MSI MAG Z790 Tomahawk WiFi |
| mb-10.png | MSI PRO B760M-A WiFi |
| mb-11.png | ASUS ROG Strix X670E-E WiFi |
| mb-12.png | Gigabyte B650 AORUS Elite AX |
| mb-13.png | MSI MAG B550 Tomahawk |
| mb-14.png | MSI MAG B860 Tomahawk WiFi |
| mb-15.png | Gigabyte B850 Eagle WiFi6E |
| mb-16.png | ASUS ROG Maximus Z890 Hero |

### RAM (15) - save to `public/images/ram/`
| File | Product |
|------|---------|
| ram-1.png | TeamGroup DDR5-8000 32GB |
| ram-2.png | G.Skill Trident Z5 Neo DDR5-7200 32GB |
| ram-3.png | Corsair Dominator Titanium DDR5-7200 32GB |
| ram-4.png | G.Skill Trident Z5 RGB DDR5-6000 32GB |
| ram-5.png | Corsair Vengeance DDR5-5600 32GB |
| ram-6.png | Kingston Fury Beast DDR5-5200 16GB |
| ram-7.png | G.Skill Trident Z5 RGB DDR5-6400 64GB |
| ram-8.png | Corsair Vengeance LPX DDR4-3200 16GB |
| ram-9.png | G.Skill Ripjaws V DDR4-3600 32GB |
| ram-10.png | Kingston Fury Renegade DDR5-8000 32GB |
| ram-11.png | G.Skill Flare X5 DDR5-6000 32GB |
| ram-12.png | Kingston Fury Renegade DDR5-6400 32GB |
| ram-13.png | Corsair Vengeance DDR5-5200 32GB |
| ram-14.png | G.Skill Trident Z5 RGB DDR5-8000 32GB |
| ram-15.png | TeamGroup T-Force Delta DDR5-6400 32GB |

### SSD (14) - save to `public/images/ssd/`
| File | Product |
|------|---------|
| ssd-1.png | WD Black SN8100 2TB |
| ssd-2.png | Crucial T705 2TB |
| ssd-3.png | Samsung 990 EVO Plus 2TB |
| ssd-4.png | Samsung 990 Pro 1TB |
| ssd-5.png | Samsung 990 Pro 2TB |
| ssd-6.png | WD Black SN850X 1TB |
| ssd-7.png | Kingston NV2 1TB |
| ssd-8.png | Samsung 870 EVO 1TB |
| ssd-9.png | Crucial T700 2TB |
| ssd-10.png | Samsung 990 EVO Plus 4TB |
| ssd-11.png | Crucial T500 2TB |
| ssd-12.png | WD Black SN770 1TB |
| ssd-13.png | Samsung 870 QVO 2TB |
| ssd-14.png | WD Black SN8100 1TB |

### PSU (15) - save to `public/images/psu/`
| File | Product |
|------|---------|
| psu-1.png | Corsair HX1500i ATX 3.1 |
| psu-2.png | Corsair RM1200x Shift |
| psu-3.png | Seasonic Vertex PX-1200 |
| psu-4.png | Corsair RM1000x |
| psu-5.png | Corsair RM850x |
| psu-6.png | Seasonic Focus GX-850 |
| psu-7.png | Corsair RM750x |
| psu-8.png | EVGA 700 BR |
| psu-9.png | be quiet! Dark Power 13 1000W |
| psu-10.png | Corsair HX1200i ATX 3.1 |
| psu-11.png | Thermaltake Toughpower GF3 1000W |
| psu-12.png | MSI MAG A850GL 850W |
| psu-13.png | Corsair RM850e 850W |
| psu-14.png | Seasonic Vertex GX-1200 |
| psu-15.png | be quiet! Pure Power 12M 850W |

### Cooler (13) - save to `public/images/cooler/`
| File | Product |
|------|---------|
| cool-1.png | Arctic Liquid Freezer III 360 A-RGB |
| cool-2.png | DeepCool LS720 SE |
| cool-3.png | Corsair iCUE LINK H150i RGB |
| cool-4.png | Noctua NH-D15 chromax.Black |
| cool-5.png | Thermalright PA 120 SE ARGB |
| cool-6.png | DeepCool AK400 |
| cool-7.png | NZXT Kraken X73 RGB 360mm |
| cool-8.png | Corsair iCUE H150i Elite 360mm |
| cool-9.png | Arctic Liquid Freezer II 240 |
| cool-10.png | Cooler Master Hyper 212 Black |
| cool-11.png | be quiet! Dark Rock Pro 5 |
| cool-12.png | Thermalright Frozen Prism 360 ARGB |
| cool-13.png | NZXT Kraken 240 RGB |

### Case (14) - save to `public/images/case/`
| File | Product |
|------|---------|
| case-1.png | Hyte Y70 |
| case-2.png | Lian Li O11 Dynamic EVO |
| case-3.png | Fractal Design North |
| case-4.png | Lian Li Lancool III |
| case-5.png | NZXT H7 Flow |
| case-6.png | Corsair 4000D Airflow |
| case-7.png | Fractal Design Meshify 2 |
| case-8.png | Montech AIR 903 MAX |
| case-9.png | NZXT H5 Flow |
| case-10.png | Montech AIR 903 BASE |
| case-11.png | Corsair 5000D Airflow |
| case-12.png | Lian Li LANCOOL 216 |
| case-13.png | be quiet! Pure Base 500DX |
| case-14.png | Hyte Y70 Touch |

## After adding images

```bash
node scripts/update-images.cjs
npm run build
git add .
git commit -m "Add product images"
git push origin main
npx vercel --prod
```
