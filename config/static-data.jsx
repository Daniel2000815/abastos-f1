import { avatar } from "@nextui-org/theme";
import { SunIcon } from "@/icons/SunIcon";
import { RainIcon } from "@/icons/rainy-3";
import { FogIcon } from "@/icons/FogIcon";
import {WindIcon} from "@/icons/WindIcon";

const users = [
  {
    key: "dan",
    label: "Dani",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Sarah"
  },
  {
    key: "cac",
    label: "Cacabera",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Jude"
  },
  {
    key: "aca",
    label: "Aca",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Brian"
  },
  {
    key: "pab",
    label: "Pabloca",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Luis"
  },
  {
    key: "jav",
    label: "Seon",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Destiny"
  }
];

const tracks = [
  {
    key: "mon",
    label: "Monza",
  },
  {
    key: "rus",
    label: "Russia",
  },
  {
    key: "bah",
    label: "Bahrain",
  },
  {
    key: "jed",
    label: "Jeddah",
  },
  {
    key: "aus",
    label: "Australia",
  },
  {
    key: "baku",
    label: "Baku",
  },
  {
    key: "mia",
    label: "Miami",
  },
  {
    key: "imo",
    label: "Imola",
  },
  {
    key: "bar",
    label: "Barcelona",
  },
  {
    key: "monaco",
    label: "Monaco",
  },
  {
    key: "can",
    label: "Canada",
  },
  {
    key: "sil",
    label: "Silverstone",
  },
  {
    key: "hun",
    label: "Hungary",
  },
  {
    key: "spa",
    label: "Spa-Francorchamps",
  },
  {
    key: "zan",
    label: "Zandvoort",
  },
  {
    key: "cot",
    label: "Cota",
  },
  {
    key: "sin",
    label: "Singapore",
  },
  {
    key: "suz",
    label: "Suzuka",
  },
  {
    key: "lus",
    label: "Losail",
  },
  {
    key: "austin",
    label: "Austin (COTA)",
  },
  {
    key: "mex",
    label: "Mexico City",
  },
  {
    key: "sao",
    label: "Sao Paulo",
  },
  {
    key: "vegas",
    label: "Las Vegas",
  },
  {
    key: "yas",
    label: "Yas Marina (Abu Dhabi)",
  }
].sort((a,b) => a.label.localeCompare(b.label));

const modes = [
  {
    key: "practice",
    label: "Practice",
  },
  {
    key: "quali",
    label: "Quali",
  },
  {
    key: "race",
    label: "Race",
  },
];

const weathers = [
  {
    key: "sun",
    label: "Sunny",
    icon: <SunIcon/>
  },
  {
    key: "rain",
    label: "Rainny",
    icon: <RainIcon/>
  },
  {
    key: "wind",
    label: "Windy",
    icon: <WindIcon/>
  },
  {
    key: "fog",
    label: "Foggy",
    icon: <FogIcon/>
  },
];
export { users, tracks, modes, weathers }