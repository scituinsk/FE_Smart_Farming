import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  LogIn,
  CheckCircle,
  User,
  Lock,
  Key,
  Info,
  XCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  loginService,
  deleteAccountService,
} from "../../services/account-service";

import { Button } from "../../components/ui/button";
import { Input, Label } from "../../components/ui/input";

const DeleteAccountPage = () => {
  // --- STATE ---
  const [step, setStep] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [randomCode, setRandomCode] = useState("");
  const [userTypedCode, setUserTypedCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Reset error saat mengetik
  useEffect(() => {
    if (errorMessage) setErrorMessage("");
  }, [username, password, userTypedCode, errorMessage]);

  // Generate Kode Acak
  const generateCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // --- LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const responseData = await loginService(username, password);
      const receivedToken = responseData.data?.access;

      if (receivedToken) {
        setToken(receivedToken);
        setRandomCode(generateCode());
        setStep("confirm");
      } else {
        setErrorMessage("Gagal: Token akses tidak ditemukan.");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Login Gagal. Cek username & password Anda.",
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setUserTypedCode("");
    setErrorMessage("");
    setStep("login");
  };
  const handleDeleteAction = async () => {
    setErrorMessage("");

    if (userTypedCode !== randomCode) {
      setErrorMessage(
        "Kode verifikasi SALAH. Silakan ketik ulang kode di atas.",
      );
      return;
    }

    setLoading(true);
    try {
      await deleteAccountService(token, password);
      setStep("success");
    } catch (error) {
      setErrorMessage(
        error.message || "Gagal menghapus akun. Sesi mungkin telah berakhir.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4 font-sans">
      {/* Container Utama */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-[450px]">
        {/* STEP LOGIN */}
        {step === "login" && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 mb-3">
                <LogIn className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Hapus Akun</h2>
              <p className="text-slate-500 text-sm mt-1">Smart Farming App</p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
                <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ---  BOX KEBIJAKAN GOOGLE PLAY) --- */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-emerald-800" />
                <strong className="text-emerald-900 text-sm">
                  Kebijakan Penghapusan Data
                </strong>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-emerald-800 leading-relaxed">
                <li>
                  <strong>Data Pribadi:</strong> Nama, email, dan foto profil
                  akan dihapus permanen.
                </li>
                <li>
                  <strong>Data Aktivitas:</strong> Riwayat penggunaan aplikasi
                  akan dihapus dari server.
                </li>
                <li>
                  <strong>Retensi:</strong> Kami tidak menyimpan data Anda
                  setelah penghapusan.
                </li>
              </ul>
            </div>
            {/* -------------------------------------------------------- */}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label className="ml-1 text-slate-700">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Input
                    type="text"
                    placeholder="Masukkan username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="ml-1 text-slate-700">Password</Label>
                <div className="relative">
                  {/* Ikon Gembok di Kiri */}
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none z-20"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="default"
                  className="w-full"
                  isDisabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Memverifikasi...
                    </>
                  ) : (
                    "Lanjutkan Penghapusan"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* STEP KONFIRMASI */}
        {step === "confirm" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mb-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-red-600">
                Konfirmasi Akhir
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Tindakan ini tidak dapat dibatalkan
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-center text-slate-600 mb-4 text-sm px-2">
              Ketik kode di bawah untuk menghapus akun{" "}
              <strong>{username}</strong>:
            </p>

            <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-4 text-center mb-6">
              <span className="font-mono text-3xl font-bold tracking-[0.3em] text-slate-700 select-all">
                {randomCode}
              </span>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                <Input
                  type="text"
                  placeholder="Tulis ulang kode..."
                  value={userTypedCode}
                  onChange={(e) =>
                    setUserTypedCode(e.target.value.toUpperCase())
                  }
                  className="pl-10 uppercase font-bold text-center tracking-widest"
                />
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  onPress={handleDeleteAction}
                  onClick={handleDeleteAction}
                  variant="destructive"
                  size="default"
                  className="w-full"
                  isDisabled={loading || userTypedCode.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Menghapus...
                    </>
                  ) : (
                    "Konfirmasi Hapus Permanen"
                  )}
                </Button>

                <Button
                  onPress={handleCancel}
                  onClick={handleCancel}
                  variant="outline"
                  size="default"
                  className="w-full border-slate-300 text-slate-600"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP SUKSES */}
        {step === "success" && (
          <div className="text-center py-8 animate-in zoom-in duration-300">
            <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Akun Terhapus
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed text-sm px-4">
              Seluruh data Anda telah dihapus dari sistem kami. Terima kasih
              telah menggunakan layanan Smart Farming App.
            </p>

            <Button
              onPress={() => window.location.reload()}
              onClick={() => window.location.reload()}
              variant="primary"
              className="w-full"
            >
              Selesai
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountPage;
