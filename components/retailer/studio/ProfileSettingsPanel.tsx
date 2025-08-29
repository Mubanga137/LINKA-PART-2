"use client";

import { useRef, useState } from "react";

export function ProfileSettingsPanel() {
  const [name, setName] = useState("Zambian Crafts Store");
  const [email, setEmail] = useState("retailer@example.com");
  const [twoFA, setTwoFA] = useState(true);
  const [logo, setLogo] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const save = () => alert("Settings saved");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm lg:col-span-2">
        <div className="mb-3 text-sm font-semibold">Profile</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-sm">
            <div className="text-slate-600 mb-1">Store Name</div>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0099cc]" />
          </label>
          <label className="text-sm">
            <div className="text-slate-600 mb-1">Email</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm" />
          </label>
        </div>
        <div className="mt-3">
          <button onClick={save} className="rounded-lg border px-3 py-2 text-sm bg-[#ff6600] text-white hover:brightness-105">Save Changes</button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">Branding & Security</div>
        <div className="space-y-3">
          <div>
            <div className="text-xs text-slate-600 mb-1">Logo</div>
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-xl border bg-white overflow-hidden">
                {logo ? <img src={logo} alt="logo" className="h-full w-full object-cover"/> : <span className="text-[10px] text-slate-500">No Logo</span>}
              </div>
              <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setLogo(String(r.result)); r.readAsDataURL(f); }} />
              <button onClick={()=>ref.current?.click()} className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50">Upload</button>
            </div>
          </div>
          <label className="flex items-center justify-between rounded-md border px-3 py-2">
            <span className="text-sm font-medium">Two-Factor Authentication</span>
            <input type="checkbox" checked={twoFA} onChange={e=>setTwoFA(e.target.checked)} className="h-4 w-4 accent-[#0099cc]" />
          </label>
          <label className="flex items-center justify-between rounded-md border px-3 py-2">
            <span className="text-sm font-medium">Email Alerts</span>
            <input defaultChecked type="checkbox" className="h-4 w-4 accent-[#ff6600]" />
          </label>
        </div>
      </div>
    </div>
  );
}
