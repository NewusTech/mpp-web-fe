export type Berita = {
  id: number;
  title: string;
  slug: string;
  desc: string;
  image: string;
  instansi_id: number;
  url: string;
  createdAt: string;
  Instansi: {
    id: number;
    name: string;
  };
};

export interface ContactType {
  alamat: string;
  email: string;
  telp: string;
  latitude: string;
  longitude: string;
}

export interface PermohonanDataType {
  id: number;
  instansi_name: string;
  layanan_name: string;
  noPermohonan: string;
  instansi: string;
  tanggal: string;
  status: number;
  pesan: string;
  tanggalSelesai: string;
  createdAt: string;
}

export interface PengaduanType {
  id: number;
  judul: string;
  image: string;
  instansi_id: number;
  instansi_name: string;
  layanan_id: number;
  layanan_name: string;
  jawaban: string;
  status: number;
  aduan: string;
}

export interface PengaduanFormType {
  instansi_id: number;
  layanan_id: number;
  status: number;
  aduan: string;
  judul: string;
  image: string;
}

export interface JenisLayananType {
  id: number;
  active_offline: boolean;
  createdAt: string;
  instansi_id: number;
  instansi_name: string;
  name: string;
  slug: string;
  status: boolean;
  desc: string;
}

export interface Layanantype {
  id: number;
  name: string;
  image?: string;
  slug: string;
  jmlLayanan: number;
  active_offline: boolean;
}

export interface faqType {
  id: number;
  question: string;
  answer: string;
}

export type MyBerita = {
  status: string;
  message: string;
  data: [Berita];
};

export type Instansi = {
  id: number;
  name: string;
  image?: string;
  slug: string;
  jmlLayanan: number;
  active_offline: boolean;
};

export type MyInstansi = {
  status: string;
  message: string;
  data: [Instansi];
};

export interface FacilityType {
  id: number;
  title: string;
  image: string;
  slug: string;
}

export interface InfoLandingType {
  instansiCount: string;
  layananCount: string;
  permohonanCountToday: string;
}

export interface CarouselType {
  image: string;
}

export interface VideoType {
  video: string;
}

export interface AlurType {
  image: string;
}

export interface VisiMisiType {
  visi: string;
  misi: string;
}

export type DataStatistik = {
  name: string;
  permohonan_count: number;
  skm_count: number;
};

export type StatistikType = {
  countPerYear: { [key: string]: number };
  formattedCountByInstansi: DataStatistik[];
};

export interface ProfileType {
  id: number;
  name: string;
  email: string;
  telepon: string;
  nik: string;
  kecamatan_name: string;
  desa_name: string;
  rt: string;
  rw: string;
  alamat: string;
  slug: string;
}

export interface ProfileNewType {
  id: number;
  name: string;
  email: string;
  telepon: string;
  nik: string;
  gender?: number;
  agama?: number;
  pendidikan?: number;
  pekerjaan?: string;
  kecamatan_name: string;
  desa_name: string;
  rt: string;
  rw: string;
  alamat: string;
  slug: string;
}

export interface UpdateUserType {
  id?: number;
  name?: string;
  nik?: string;
  gender?: string;
  agama?: string;
  pendidikan?: string;
  pekerjaan?: string;
  telepon?: string;
  email?: string;
  kecamatan_id?: string;
  desa_id?: string;
  rt?: string;
  rw?: string;
  alamat?: string;
  slug?: string;
}

export interface KecamatanType {
  id: number;
  name: string;
}

export interface DesaType {
  id: number;
  name: string;
}

export type InfoType = {
  status: string;
  data: {
    name: string;
    nik: string;
    telepon: string;
    alamat: string;
    slug: string;
  };
};

export type LayananFormType = {
  id: number;
  field: string;
  tipedata: string;
};

export type LayananType = {
  Layananforms: LayananFormType[];
  desc: string;
  image: string;
  name: string;
  slug: string;
};

export interface AppType {
  name: string;
  slug: string;
  image: string;
  link: string;
  desc: string;
}

export interface CardStepProps {
  title: string;
  isLastStep: boolean;
  isActive: boolean;
}

export interface AlurAntrianType {
  id: number;
  desc: string;
}

export interface AlurPermohonanType {
  id: number;
  desc: string;
}
