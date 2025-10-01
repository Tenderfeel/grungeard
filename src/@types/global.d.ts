
type Lang = 'en' | 'ja'

type Character = {
    id: number;
    name: { [key in Lang]: string };
    fullName: { [key in Lang]: string };
    specialty: string;
    stats: string;
    attackType: string;
    faction: { [key in Lang]: string };
    rarity: string;
};