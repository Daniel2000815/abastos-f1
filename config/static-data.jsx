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
  ,
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
    key: "it",
    label: "Monaco",
  },
];

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