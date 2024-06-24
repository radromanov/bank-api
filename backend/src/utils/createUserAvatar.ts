import { capitalize } from "./capitalize";

const BACKGROUND_AND_TEXT_COLORS = [
  { background: "1B263B", color: "E0E1DD" },
  { background: "F7B267", color: "2F2E41" },
  { background: "6D597A", color: "F8E9A1" },
  { background: "355070", color: "F4A261" },
  { background: "3D5A80", color: "EE6C4D" },
  { background: "2A9D8F", color: "E9C46A" },
  { background: "264653", color: "E76F51" },
  { background: "8D99AE", color: "EDF2F4" },
  { background: "E63946", color: "F1FAEE" },
  { background: "457B9D", color: "A8DADC" },
  { background: "1D3557", color: "F1FAEE" },
  { background: "3A0CA3", color: "F72585" },
  { background: "4A4E69", color: "9A8C98" },
  { background: "22223B", color: "F2E9E4" },
  { background: "9A031E", color: "EDE9E9" },
  { background: "5A189A", color: "E0AAFF" },
  { background: "FF006E", color: "8338EC" },
  { background: "FB8B24", color: "F4D35E" },
  { background: "0A9396", color: "E9D8A6" },
  { background: "005F73", color: "E9D8A6" },
];

export const createUserAvatar = (
  firstName: string,
  lastName: string,
  colorSet: {
    background: string;
    color: string;
  }[] = BACKGROUND_AND_TEXT_COLORS,
) => {
  const randomIdx = Math.floor(Math.random() * colorSet.length);

  const { background, color } = colorSet[randomIdx];
  const name = `${capitalize(firstName)}+${capitalize(lastName)}`;

  const url = `https://avatar.iran.liara.run/username?username=${name}&background=${background}&color=${color}`;

  return url;
};
