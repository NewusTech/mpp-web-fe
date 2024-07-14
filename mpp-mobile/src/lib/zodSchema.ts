import { z } from "zod";

export const schemaRegister = z.object({
  name: z.string().refine((val) => val !== "", "Nama lengkap harus diisi"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 karakter"),
  telepon: z
    .string()
    .min(12, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(13, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  email: z.string().email("Email tidak valid"),
  kecamatan_id: z.string({ message: "Pilih Asal Kecamatan" }),
  desa_id: z.string({ message: "Pilih Asal Desa" }),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
  term: z
    .boolean()
    .refine((val) => val === true, "Syarat dan ketentuan harus disetujui"),
});

export const schema = z.object({
  name: z.string().refine((val) => val !== "", "Nama Lengkap harus diisi"),
  email: z.string().email("Email tidak valid"),
  telepon: z
    .string()
    .min(12, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(13, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 karakter"),
  gender: z.string({ message: "Pilih Jenis Kelamin" }),
  agama: z.string({ message: "Pilih Agama" }),
  pendidikan: z.string({ message: "Pilih Pendidikan" }),
  pekerjaan: z.string({ message: "Harap isi pekerjaanmu saat ini!" }),
  kecamatan_id: z.string({ message: "Pilih Asal Kecamatan" }),
  desa_id: z.string({ message: "Pilih Asal Desa" }),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
  filektp: z.string().refine((val) => val !== "", "File KTP harus diisi"),
  filekk: z.string().refine((val) => val !== "", "File KK harus diisi"),
  fileijazahsd: z
    .string()
    .refine((val) => val !== "", "File Ijazah Terakhir harus diisi"),
});

export const schemaBooking = z.object({
  tanggal: z.string().refine((val) => val !== "", "Isi Tanggal"),
  waktu: z.string().refine((val) => val !== "", "Isi Waktu"),
});

export const schemaDataDiri = z.object({
  name: z.string().refine((val) => val !== "", "Nama Lengkap harus diisi"),
  email: z.string().email("Email tidak valid"),
  telepon: z
    .string()
    .min(12, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(13, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 karakter"),
  gender: z.string({ message: "Pilih Jenis Kelamin" }),
  goldar: z.string({ message: "Pilih Golongan Darah" }),
  status_kawin: z.string({ message: "Pilih Status Perkawinan" }),
  tempat_lahir: z
    .string()
    .refine((val) => val !== "", "Tempat Lahir harus diisi"),
  tgl_lahir: z.string().refine((val) => val !== "", "Tgl Lahir harus diisi"),
  agama: z.string({ message: "Pilih Agama" }),
  pendidikan: z.string({ message: "Pilih Pendidikan" }),
  pekerjaan: z.string({ message: "Harap isi pekerjaanmu saat ini!" }),
  kecamatan_id: z.string({ message: "Pilih Asal Kecamatan" }),
  desa_id: z.string({ message: "Pilih Asal Desa" }),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
});

export const schemaSkm = z.object({
  kritiksaran: z
    .string()
    .refine((val) => val !== "", "Kritik Saran Harus Diisi"),
});

export const schemaUpdateDiri = z.object({
  name: z.string().refine((val) => val !== "", "Nama Lurator harus diisi"),
  email: z.string().email("Email tidak valid"),
  telepon: z
    .string()
    .min(12, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(13, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 karakter"),
  gender: z.string({ message: "Pilih Jenis Kelamin" }).optional(),
  goldar: z.string({ message: "Pilih Golongan Darah" }).optional(),
  status_kawin: z.string({ message: "Pilih Status Perkawinan" }).optional(),
  tempat_lahir: z
    .string()
    .refine((val) => val !== "", "Tempat Lahir harus diisi")
    .optional(),
  tgl_lahir: z
    .string()
    .refine((val) => val !== "", "Tgl Lahir harus diisi")
    .optional(),
  agama: z.string({ message: "Pilih Agama" }).optional(),
  pendidikan: z.string({ message: "Pilih Pendidikan" }).optional(),
  pekerjaan: z
    .string({ message: "Harap isi pekerjaanmu saat ini!" })
    .optional(),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
});
