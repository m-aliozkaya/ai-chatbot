export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  diagnosis: string[];
  treatments: string[];
  tests: string[];
  history: string;
}

export const mockPatients: Patient[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    age: 45,
    gender: "Erkek",
    diagnosis: ["Hipertansiyon", "Tip 2 Diyabet"],
    treatments: ["ACE inhibitörü", "Metformin"],
    tests: ["Kan Şekeri Takibi", "Tansiyon Ölçümü"],
    history: "10 yıldır hipertansiyon hastası. Son 5 yıldır diyabet tedavisi görüyor."
  },
  {
    id: 2,
    name: "Ayşe Demir",
    age: 35,
    gender: "Kadın",
    diagnosis: ["Migren", "Anemi"],
    treatments: ["Sumatriptan", "Demir Takviyesi"],
    tests: ["Hemogram", "MR"],
    history: "Kronik migren şikayeti mevcut. Demir eksikliği anemisi tedavi altında."
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    age: 60,
    gender: "Erkek",
    diagnosis: ["Koroner Arter Hastalığı", "KOAH"],
    treatments: ["Beta Bloker", "Bronkodilatatör"],
    tests: ["EKG", "Solunum Fonksiyon Testi"],
    history: "2018'de bypass ameliyatı geçirdi. KOAH için düzenli ilaç kullanıyor."
  }
]; 