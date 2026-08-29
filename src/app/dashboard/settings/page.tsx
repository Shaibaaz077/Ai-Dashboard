"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Sliders,
  Trash2,
  Bell,
  Shield,
  ChevronRight,
} from "lucide-react";

// --- Toggle component ---

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
        enabled ? "bg-primary" : "bg-muted"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200 ${
          enabled ? "left-5" : "left-1"
        }`}
      />
    </button>
  );
}

// --- Section wrapper ---

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {children}
      </CardContent>
    </Card>
  );
}

// --- Row components ---

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col min-w-0">
        <span className="text-sm text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground mt-0.5">
            {description}
          </span>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

// --- Main ---

export default function SettingsPage() {
  // Profile
  const [name, setName] = useState("Mohd Shaikh");
  const [email, setEmail] = useState("mohds@email.com");
  const [saved, setSaved] = useState(false);

  // Preferences
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode] = useState(false);

  // Notifications
  const [emailNotif, setEmailNotif] = useState(false);
  const [usageAlerts, setUsageAlerts] = useState(true);
  const [tips, setTips] = useState(true);

  // Danger
  const [confirmClear, setConfirmClear] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearHistory = () => {
    if (confirmClear) {
      localStorage.removeItem("nexusai_history");
      setConfirmClear(false);
      window.location.reload();
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="mb-2">
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile */}
      <Section title="Profile" icon={User}>
        <SettingRow label="Full name" description="Your display name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-44 h-8 text-sm"
          />
        </SettingRow>
        <SettingRow label="Email" description="Your account email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-44 h-8 text-sm"
            type="email"
          />
        </SettingRow>
        <div className="pt-3 pb-3">
          <Button
            size="sm"
            onClick={handleSaveProfile}
            className="w-full sm:w-auto"
          >
            {saved ? "✓ Saved!" : "Save changes"}
          </Button>
        </div>
      </Section>

      {/* Preferences */}
      <Section title="Preferences" icon={Sliders}>
        <SettingRow
          label="Default tone"
          description="Applied to all your generations"
        >
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </SettingRow>
        <SettingRow
          label="Output length"
          description="How long your generations should be"
        >
          <Select value={length} onValueChange={setLength}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>
        </SettingRow>
        <SettingRow
          label="Auto-save outputs"
          description="Save every generation to history automatically"
        >
          <Toggle enabled={autoSave} onChange={() => setAutoSave((v) => !v)} />
        </SettingRow>
        <SettingRow
          label="Dark mode"
          description="Switch between light and dark theme"
        >
          <Toggle
            enabled={darkMode}
            onChange={() => {
              alert("Dark mode coming soon! Stay tuned.");
            }}
          />
        </SettingRow>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" icon={Bell}>
        <SettingRow
          label="Email notifications"
          description="Receive updates via email"
        >
          <Toggle
            enabled={emailNotif}
            onChange={() => setEmailNotif((v) => !v)}
          />
        </SettingRow>
        <SettingRow
          label="Usage alerts"
          description="Alert when nearing free plan limits"
        >
          <Toggle
            enabled={usageAlerts}
            onChange={() => setUsageAlerts((v) => !v)}
          />
        </SettingRow>
        <SettingRow
          label="Tips and tricks"
          description="Get helpful generation tips"
        >
          <Toggle enabled={tips} onChange={() => setTips((v) => !v)} />
        </SettingRow>
      </Section>

      {/* Account */}
      <Section title="Account" icon={Shield}>
        <SettingRow label="Plan" description="Your current subscription">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-600">
            Free forever
          </span>
        </SettingRow>
        <SettingRow
          label="Data & Privacy"
          description="View our privacy policy"
        >
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            View
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </SettingRow>
        <SettingRow label="Version" description="Current app version">
          <span className="text-xs text-muted-foreground">v1.0.0</span>
        </SettingRow>
      </Section>

      {/* Danger zone */}
      <Card className="border-red-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-red-500" />
            </div>
            <CardTitle className="text-sm font-medium text-red-500">
              Danger zone
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border">
          <SettingRow
            label="Clear all history"
            description="Permanently delete all your generations"
          >
            <Button
              size="sm"
              variant="destructive"
              onClick={handleClearHistory}
              className="text-xs h-8"
            >
              {confirmClear ? "Click again to confirm" : "Clear history"}
            </Button>
          </SettingRow>
          <SettingRow
            label="Delete account"
            description="Permanently delete your account and data"
          >
            <Button
              size="sm"
              variant="destructive"
              className="text-xs h-8"
              onClick={() => alert("Contact support to delete your account.")}
            >
              Delete account
            </Button>
          </SettingRow>
        </CardContent>
      </Card>
    </div>
  );
}
