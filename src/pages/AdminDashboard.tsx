import { useState } from "react";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  const pendingRequests = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu",
      department: "Computer Science",
      requestDate: "2024-01-15",
      reason: "Want to host tech workshops and coding bootcamps for students",
      status: "pending"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@university.edu",
      department: "Art & Design",
      requestDate: "2024-01-14",
      reason: "Planning art exhibitions and creative events",
      status: "pending"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@university.edu",
      department: "Business",
      requestDate: "2024-01-13",
      reason: "Organizing networking events and career fairs",
      status: "pending"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@university.edu",
      role: "student",
      joinDate: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "Lisa Wang",
      email: "lisa.wang@university.edu",
      role: "host",
      joinDate: "2024-01-14",
      status: "active"
    },
    {
      id: 3,
      name: "David Brown",
      email: "david.brown@university.edu",
      role: "student",
      joinDate: "2024-01-13",
      status: "inactive"
    }
  ];

  const systemStats = {
    totalUsers: 1250,
    activeUsers: 1100,
    totalEvents: 45,
    pendingRequests: 3,
    systemUptime: "99.9%",
    storageUsed: "2.3 GB"
  };

  const handleApproveRequest = (requestId: number) => {
    console.log(`Approving request ${requestId}`);
    // Handle approval logic
  };

  const handleRejectRequest = (requestId: number) => {
    console.log(`Rejecting request ${requestId}`);
    // Handle rejection logic
  };

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
                    <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <UsersIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold text-orange-500">{systemStats.pendingRequests}</p>
                  </div>
                  <AlertTriangleIcon className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                    <p className="text-2xl font-bold text-green-500">{systemStats.systemUptime}</p>
                  </div>
                  <ActivityIcon className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                    <p className="text-2xl font-bold">{systemStats.storageUsed}</p>
                  </div>
                  <DatabaseIcon className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Pending Requests */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Host Requests */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldIcon className="h-5 w-5 text-primary" />
                    Pending Host Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">{request.email}</p>
                          <p className="text-sm text-muted-foreground">{request.department}</p>
                        </div>
                        <Badge variant="outline" className="text-orange-500 border-orange-500">
                          {request.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{request.reason}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Requested on {request.requestDate}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveRequest(request.id)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectRequest(request.id)}
                            className="text-red-500 border-red-500 hover:bg-red-50"
                          >
                            <XCircleIcon className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Logs */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ActivityIcon className="h-5 w-5 text-primary" />
                    Recent System Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">User registration completed</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New event created</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Host request submitted</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - User Management & Quick Actions */}
            <div className="space-y-6">
              {/* User Management */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    Recent Users
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.joinDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.role === 'host' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/manage-users">Manage All Users</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/system-logs">
                      <BarChart3Icon className="mr-2 h-4 w-4" />
                      View System Logs
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/manage-users">
                      <UserCheckIcon className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/system-settings">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      System Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="h-5 w-5 text-primary" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>23%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>67%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
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
