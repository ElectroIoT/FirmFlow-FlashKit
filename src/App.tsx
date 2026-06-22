import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Flash from "./pages/Flash";
import Backup from "./pages/Backup";
import Restore from "./pages/Restore";
import SerialMonitor from "./pages/SerialMonitor";
import Partitions from "./pages/Partitions";
import History from "./pages/History";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden grid-bg">
      {/* Ambient scan line */}
      <div className="scan-line" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/flash" element={<Flash />} />
              <Route path="/backup" element={<Backup />} />
              <Route path="/restore" element={<Restore />} />
              <Route path="/serial" element={<SerialMonitor />} />
              <Route path="/partitions" element={<Partitions />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
