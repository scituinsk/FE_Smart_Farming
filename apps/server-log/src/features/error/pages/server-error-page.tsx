import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router";

export const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="text-9xl font-black text-destructive">500</div>
              <div className="absolute -bottom-2 -right-2 h-full w-full  bg-transparent" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black uppercase tracking-tight">Server Error</CardTitle>
          <CardDescription className="text-base font-medium">
            Ups! Terjadi kesalahan pada server. Mohon maaf atas ketidaknyamanan ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-l-4 border-destructive bg-destructive/10">
            <AlertDescription className="text-sm font-semibold text-foreground">
              Server sedang mengalami gangguan. Tim kami sudah diberitahu dan sedang menangani masalah ini.
            </AlertDescription>
          </Alert>

          <div className="rounded-none border-l-4 border-muted bg-muted/50 p-4">
            <p className="text-sm font-semibold text-foreground">Apa yang bisa Anda lakukan:</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Coba muat ulang halaman ini</li>
              <li>• Tunggu beberapa saat dan coba lagi</li>
              <li>• Kembali ke halaman sebelumnya</li>
              <li>• Hubungi support jika masalah berlanjut</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex-1 font-bold uppercase"
          >
            Ke Beranda
          </Button>
          <Button
            onClick={handleReload}
            variant="destructive"
            className="flex-1 font-bold uppercase"
          >
            Muat Ulang
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
