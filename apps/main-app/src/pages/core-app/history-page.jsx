import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import { Button } from "../../components/ui/button";
import { Input, TextField } from "../../components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";

export const HistoryPage = () => {
  return (
    <div className="app-container">
      <h1 className="clash-display-font font-semibold  text-lg lg:text-[28px] tracking-wider mb-5">
        Mencatat aktivitas yang terjadi pada sistem
      </h1>

      <div className="my-5">
        <h2 className="font-semibold text-lg lg:text-[20px] tracking-wider my-5">
          Cari Riwayat
        </h2>

        <div className="grid grid-cols-12 gap-4 md:gap-2">
          {/* Input Pencarian */}
          <div className="col-span-12 lg:col-span-9 h-[54px]">
            <div className="relative h-full w-full">
              <FaSearch
                aria-hidden="true"
                className="
                absolute top-1/2 left-5 -translate-y-1/2 
                text-zinc-500 pointer-events-none
                peer-focus:hidden transition-opacity
              "
              />
              <TextField className="h-full">
                <Input
                  type="text"
                  placeholder="Search"
                  className="rounded-[30px] h-full pl-12 peer"
                />
              </TextField>
            </div>
          </div>

          {/* Tombol Filter */}
          <Button
            variant="ghost"
            className="col-span-3 lg:col-span-1 bg-white hover:bg-white/70 size-[54px] aspect-square rounded-full mx-auto flex items-center justify-center"
          >
            <svg
              width={19}
              height={19}
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.0875 1.18164C6.35435 1.18126 5.63914 1.40827 5.04042 1.83139C4.44169 2.25452 3.98894 2.85293 3.74456 3.54414H0V5.90664H3.74456C3.98861 6.5983 4.44119 7.19724 5.03992 7.62088C5.63865 8.04453 6.35405 8.27204 7.0875 8.27204C7.82095 8.27204 8.53635 8.04453 9.13508 7.62088C9.73381 7.19724 10.1864 6.5983 10.4304 5.90664H18.9V3.54414H10.4304C10.1861 2.85293 9.73331 2.25452 9.13458 1.83139C8.53586 1.40827 7.82064 1.18126 7.0875 1.18164ZM5.90625 4.72539C5.90625 4.4121 6.0307 4.11165 6.25223 3.89012C6.47376 3.66859 6.77421 3.54414 7.0875 3.54414C7.40079 3.54414 7.70124 3.66859 7.92277 3.89012C8.1443 4.11165 8.26875 4.4121 8.26875 4.72539C8.26875 5.03868 8.1443 5.33913 7.92277 5.56066C7.70124 5.78219 7.40079 5.90664 7.0875 5.90664C6.77421 5.90664 6.47376 5.78219 6.25223 5.56066C6.0307 5.33913 5.90625 5.03868 5.90625 4.72539ZM11.8125 10.6316C11.0794 10.6313 10.3641 10.8583 9.76542 11.2814C9.16669 11.7045 8.71394 12.3029 8.46956 12.9941H0V15.3566H8.46956C8.71361 16.0483 9.16619 16.6472 9.76492 17.0709C10.3636 17.4945 11.079 17.722 11.8125 17.722C12.546 17.722 13.2613 17.4945 13.8601 17.0709C14.4588 16.6472 14.9114 16.0483 15.1554 15.3566H18.9V12.9941H15.1554C14.9111 12.3029 14.4583 11.7045 13.8596 11.2814C13.2609 10.8583 12.5456 10.6313 11.8125 10.6316ZM10.6312 14.1754C10.6312 13.8621 10.7557 13.5616 10.9772 13.3401C11.1988 13.1186 11.4992 12.9941 11.8125 12.9941C12.1258 12.9941 12.4262 13.1186 12.6478 13.3401C12.8693 13.5616 12.9937 13.8621 12.9937 14.1754C12.9937 14.4887 12.8693 14.7891 12.6478 15.0107C12.4262 15.2322 12.1258 15.3566 11.8125 15.3566C11.4992 15.3566 11.1988 15.2322 10.9772 15.0107C10.7557 14.7891 10.6312 14.4887 10.6312 14.1754Z"
                className="fill-primary"
              />
            </svg>
          </Button>

          {/* Tombol Tambah Module */}
          <div className="col-span-9 lg:col-span-2">
            <Button
              className="h-[54px] w-full inline-flex text-base"
              variant="outline"
            >
              <FaPlus className="size-5 mr-4" /> Tambah Module
            </Button>
          </div>
        </div>
      </div>
      <Dialog>
        {/* Tombol untuk membuka dialog */}
        <DialogTrigger className="bg-blue-500 text-white p-2 rounded">
          Buka Dialog
        </DialogTrigger>

        {/* Konten dialog, tombol close akan muncul otomatis */}
        <DialogContent isDismissable={false}>
          <DialogHeader>
            <DialogTitle>Judul Dialog</DialogTitle>
            <DialogDescription>
              Ini adalah deskripsi di dalam dialog. Tombol 'X' di pojok kanan
              atas sekarang berfungsi untuk menutup dialog ini.
            </DialogDescription>
          </DialogHeader>
          <p>Konten utama dialog...</p>
          <DialogFooter>
            {/* Anda masih bisa membuat tombol close manual jika mau */}
            {/* <DialogClose asChild> */}
            {/* <Button variant="secondary">Tutup Manual</Button> */}
            {/* </DialogClose> */}
            <button className="bg-gray-200 p-2 rounded">Simpan</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
