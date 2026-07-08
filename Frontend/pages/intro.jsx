import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-2xl border bg-white shadow-xl p-10 md:p-14 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          TaskManager
        </h1>

        <p className="mt-5 text-lg text-gray-600 leading-8">
          Organize your tasks, stay productive, and build consistency every day.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>Create Tasks</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>Track Progress</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>Stay Organized</span>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <Button size="lg" onClick={() => navigate("/register")}>
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  );
}
