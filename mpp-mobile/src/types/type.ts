export type Berita = {
  title: string;
  slug: string;
  desc: string;
  image: string;
  url: string;
  createdAt: string;
};

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

export interface UpdateUserType {
  id?: number;
  name?: string;
  nik?: string;
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
