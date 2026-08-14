import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "sy.daraa.civil.affairs",
  appName: "الشؤون المدنية درعا",
  webDir: "dist/public",
  server: {
    androidScheme: "https",
    url: "https://3000-irpe1c911pok3eft70tbb-51769403.us4.manus.computer",
    cleartext: false,
    allowNavigation: ["3000-irpe1c911pok3eft70tbb-51769403.us4.manus.computer"],
  },
};

export default config;
