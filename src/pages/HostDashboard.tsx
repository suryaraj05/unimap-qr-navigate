import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, 
  PlusIcon, 
  UsersIcon, 
  StarIcon, 
  MapPinIcon, 
  ClockIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  TrendingUpIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { listEvents, type EventDoc, listEnrollmentsByEvent } from "@/services/firestore";

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const { user } = useAuth();
  const [events, setEvents] = useState<(EventDoc & { id?: string })[]>([]);
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      try {
        const all = await listEvents();
        // filter by createdBy if present
        const mine = all.filter((e: any) => e.createdBy && user && e.createdBy === user.id);
        setEvents(mine);
        // fetch enrollments per event
        const pairs = await Promise.all(
          mine.map(async (e: any) => {
            const list = await listEnrollmentsByEvent(e.id as string);
            return [e.id as string, list.length] as const;
          })
        );
        const map: Record<string, number> = {};
        pairs.forEach(([id, count]) => { map[id] = count; });
        setAttendeeCounts(map);
      } catch {}
    })();
  }, [user]);

  const stats = useMemo(() => {
    const totalEvents = events.length;
    const upcomingEvents = events.filter(e => e.date >= new Date().toISOString().slice(0,10)).length;
    const totalAttendees = Object.values(attendeeCounts).reduce((a,b) => a+b, 0);
    return { totalEvents, upcomingEvents, totalAttendees, averageRating: 0 };
  }, [events, attendeeCounts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 bg-gradient-secondary">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Event Host!</h1>
            <p className="text-muted-foreground">
              Manage your events and track engagement with your campus community.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                    <p className="text-2xl font-bold">{stats.totalEvents}</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                  </div>
                  <ClockIcon className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                    <p className="text-2xl font-bold">{stats.totalAttendees}</p>
                  </div>
                  <UsersIcon className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold">{stats.averageRating}</p>
                  </div>
                  <StarIcon className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Events Management */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusIcon className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button asChild className="h-12 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300">
                      <Link to="/create-event">
                        <PlusIcon className="mr-2 h-5 w-5" />
                        Create New Event
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-12 hover:bg-secondary/50 transition-colors">
                      <TrendingUpIcon className="mr-2 h-5 w-5" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* My Created Events */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      My Created Events
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/manage-events">Manage All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.map((event) => (
                    <div key={(event as any).id} className="p-4 border rounded-lg hover:shadow-card transition-all duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="font-medium">{attendeeCounts[(event as any).id as string] || 0}</span>
                            <span className="text-muted-foreground">/{event.maxAttendees} attendees</span>
                          </div>
                          <div className="w-24 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${Math.min(100, ((attendeeCounts[(event as any).id as string] || 0) / Math.max(1, event.maxAttendees)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <div className="text-sm text-muted-foreground">No events created yet. Use "Create New Event" to add your first event.</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Feedback & Quick Links */}
            <div className="space-y-6">
              {/* Recent Feedback */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-primary" />
                    Recent Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg text-sm text-muted-foreground">
                    Feedback feature coming soon.
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/map">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      Campus Map
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/events">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Browse Events
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/qr-navigate">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      QR Navigation
                    </Link>
                  </Button>
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

export default HostDashboard;
