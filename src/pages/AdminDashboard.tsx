import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  UsersIcon, 
  ShieldIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  BarChart3Icon,
  SettingsIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  UserCheckIcon,
  UserXIcon,
  ActivityIcon,
  DatabaseIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { listUsers, listEvents, listPlaces, updateUserRole, deleteEvent, deletePlace, listHostRequests, deleteHostRequest, updateUserFields, createPlaceDoc, type EventDoc, type PlaceDoc } from "@/services/firestore";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<{ id: string; email: string; name: string; role: 'student'|'host'|'admin' }[]>([]);
  const [events, setEvents] = useState<(EventDoc & { id?: string })[]>([]);
  const [places, setPlaces] = useState<(PlaceDoc & { id: string })[]>([]);
  const [search, setSearch] = useState("");
  const [hostRequests, setHostRequests] = useState<{ id: string; uid: string; name: string; email: string; department?: string; reason?: string }[]>([]);
  const [newPlace, setNewPlace] = useState<{ name: string; type: string; lat: string; lng: string; image?: string; details?: string }>({ name: "", type: "", lat: "", lng: "", image: "", details: "" });
  const [addingPlace, setAddingPlace] = useState(false);

  useEffect(() => {
    (async () => {
      try { setUsers(await listUsers()); } catch {}
      try { setEvents(await listEvents()); } catch {}
      try { setPlaces(await listPlaces()); } catch {}
      try { setHostRequests(await listHostRequests()); } catch {}
    })();
  }, []);

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} userRole="admin" />
      
      <main className="flex-1 py-8 bg-gradient-secondary">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, review requests, and monitor system performance.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                  <UsersIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                    <p className="text-2xl font-bold text-orange-500">{events.length}</p>
                  </div>
                  <AlertTriangleIcon className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Places</p>
                    <p className="text-2xl font-bold text-green-500">{places.length}</p>
                  </div>
                  <ActivityIcon className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hosts</p>
                    <p className="text-2xl font-bold">{users.filter(u => u.role === 'host').length}</p>
                  </div>
                  <DatabaseIcon className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Users Management */}
            <div className="lg:col-span-2 space-y-6">
              {/* Host Requests */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldIcon className="h-5 w-5 text-primary" />
                    Pending Host Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hostRequests.map((r) => (
                    <div key={r.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{r.name || r.email}</p>
                        <p className="text-xs text-muted-foreground">{r.email} {r.department ? `• ${r.department}` : ''}</p>
                        {r.reason && <p className="text-xs text-muted-foreground mt-1">{r.reason}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={async () => {
                          await updateUserFields(r.uid, { role: 'host', hostApproved: true });
                          await deleteHostRequest(r.id);
                          setUsers(await listUsers());
                          setHostRequests(await listHostRequests());
                        }}>Approve</Button>
                        <Button size="sm" variant="outline" className="text-red-600" onClick={async () => {
                          await deleteHostRequest(r.id);
                          setHostRequests(await listHostRequests());
                        }}>Reject</Button>
                      </div>
                    </div>
                  ))}
                  {hostRequests.length === 0 && (
                    <div className="text-sm text-muted-foreground">No pending requests.</div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    Users
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Input placeholder="Search users by name, email, role" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  {filteredUsers.map((u) => (
                    <div key={u.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{u.name || u.email}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={u.role === 'host' ? 'default' : 'secondary'}>{u.role}</Badge>
                        <Button size="sm" variant="outline" onClick={async () => { await updateUserRole(u.id, 'student'); setUsers(await listUsers()); }}>Make Student</Button>
                        <Button size="sm" variant="outline" onClick={async () => { await updateUserRole(u.id, 'host'); setUsers(await listUsers()); }}>Make Host</Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={async () => { await updateUserRole(u.id, 'admin'); setUsers(await listUsers()); }}>Make Admin</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Events Management */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3Icon className="h-5 w-5 text-primary" />
                    Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {events.map((ev) => (
                    <div key={(ev as any).id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{ev.title}</p>
                        <p className="text-xs text-muted-foreground">{ev.date} • {ev.time} • {ev.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{ev.category}</Badge>
                        <Button size="sm" variant="outline" className="text-red-600" onClick={async () => { await deleteEvent((ev as any).id as string); setEvents(await listEvents()); }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Places Management & Quick Actions */}
            <div className="space-y-6">
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldIcon className="h-5 w-5 text-primary" />
                    Places
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Place Form (Admin) */}
                  <div className="p-3 border rounded-lg space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Input placeholder="Name" value={newPlace.name} onChange={(e)=>setNewPlace(p=>({...p,name:e.target.value}))} />
                      <Input placeholder="Type (Building/Gate/Hostel...)" value={newPlace.type} onChange={(e)=>setNewPlace(p=>({...p,type:e.target.value}))} />
                      <Input placeholder="Latitude" value={newPlace.lat} onChange={(e)=>setNewPlace(p=>({...p,lat:e.target.value}))} />
                      <Input placeholder="Longitude" value={newPlace.lng} onChange={(e)=>setNewPlace(p=>({...p,lng:e.target.value}))} />
                      <Input placeholder="Image (emoji or URL)" value={newPlace.image} onChange={(e)=>setNewPlace(p=>({...p,image:e.target.value}))} />
                      <Input placeholder="Details (optional)" value={newPlace.details} onChange={(e)=>setNewPlace(p=>({...p,details:e.target.value}))} />
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" disabled={addingPlace || !newPlace.name || !newPlace.type || !newPlace.lat || !newPlace.lng} onClick={async ()=>{
                        try {
                          setAddingPlace(true);
                          await createPlaceDoc({
                            name: newPlace.name.trim(),
                            type: newPlace.type.trim(),
                            lat: Number(newPlace.lat),
                            lng: Number(newPlace.lng),
                            image: newPlace.image?.trim() || undefined,
                            details: newPlace.details?.trim() || undefined,
                          });
                          setNewPlace({ name: "", type: "", lat: "", lng: "", image: "", details: "" });
                          setPlaces(await listPlaces());
                        } finally {
                          setAddingPlace(false);
                        }
                      }}>Add Place</Button>
                    </div>
                  </div>

                  {places.map((pl) => (
                    <div key={pl.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{pl.name}</p>
                        <p className="text-xs text-muted-foreground">{pl.type} • {pl.lat}, {pl.lng}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-red-600" onClick={async () => { await deletePlace(pl.id); setPlaces(await listPlaces()); }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
