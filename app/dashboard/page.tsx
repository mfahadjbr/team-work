// // "use client"

// // import { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Upload, Video, Users, MessageCircle, Eye } from "lucide-react"
// // import Link from "next/link"
// // import { isAuthenticated } from "@/lib/auth"
// // import {
// //   Line,
// //   LineChart,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   ResponsiveContainer,
// //   Bar,
// //   BarChart,
// //   Area,
// //   AreaChart,
// //   Pie,
// //   PieChart,
// //   Cell,
// // } from "recharts"
// // import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// // const monthlyAnalyticsData = [
// //   { month: "Jan", views: 12000, subscribers: 18 },
// //   { month: "Feb", views: 18500, subscribers: 19 },
// //   { month: "Mar", views: 15200, subscribers: 19 },
// //   { month: "Apr", views: 24800, subscribers: 20 },
// //   { month: "May", views: 22100, subscribers: 21 },
// //   { month: "Jun", views: 29500, subscribers: 22 },
// //   { month: "Jul", views: 34200, subscribers: 22 },
// //   { month: "Aug", views: 32800, subscribers: 23 },
// //   { month: "Sep", views: 39100, subscribers: 23 },
// //   { month: "Oct", views: 37600, subscribers: 24 },
// //   { month: "Nov", views: 42300, subscribers: 24 },
// //   { month: "Dec", views: 44100, subscribers: 24 },
// // ]

// // const topVideosData = [
// //   { title: "Python Tutorial #8", views: 525, engagement: 0.95 },
// //   { title: "JavaScript Basics", views: 312, engagement: 1.64 },
// //   { title: "React Hooks Guide", views: 287, engagement: 2.1 },
// //   { title: "CSS Grid Layout", views: 198, engagement: 1.2 },
// //   { title: "Node.js Setup", views: 156, engagement: 0.8 },
// // ]

// // const contentCategoriesData = [
// //   { name: "Python Tutorials", value: 21, color: "#00C951" },
// //   { name: "JavaScript", value: 25, color: "#00A843" },
// //   { name: "Web Development", value: 18, color: "#008735" },
// //   { name: "Programming Shorts", value: 15, color: "#006627" },
// //   { name: "OOP Concepts", value: 8, color: "#004519" },
// // ]

// // const growthTrendsData = [
// //   { month: "Jan", totalViews: 12000, subscribers: 18, engagement: 1.2 },
// //   { month: "Feb", totalViews: 30500, subscribers: 19, engagement: 1.4 },
// //   { month: "Mar", totalViews: 45700, subscribers: 19, engagement: 1.1 },
// //   { month: "Apr", totalViews: 70500, subscribers: 20, engagement: 1.8 },
// //   { month: "May", totalViews: 92600, subscribers: 21, engagement: 1.6 },
// //   { month: "Jun", totalViews: 122100, subscribers: 22, engagement: 2.1 },
// //   { month: "Jul", totalViews: 156300, subscribers: 22, engagement: 1.9 },
// //   { month: "Aug", totalViews: 189100, subscribers: 23, engagement: 2.3 },
// //   { month: "Sep", totalViews: 228200, subscribers: 23, engagement: 2.0 },
// //   { month: "Oct", totalViews: 265800, subscribers: 24, engagement: 1.7 },
// //   { month: "Nov", totalViews: 308100, subscribers: 24, engagement: 2.2 },
// //   { month: "Dec", totalViews: 352200, subscribers: 24, engagement: 2.4 },
// // ]

// // const chartData = [
// //   { week: "Week 1", views: 1000, engagement: 1.5 },
// //   { week: "Week 2", views: 1500, engagement: 1.7 },
// //   { week: "Week 3", views: 2000, engagement: 1.9 },
// //   { week: "Week 4", views: 2500, engagement: 2.1 },
// // ]

// // const performanceData = [
// //   { category: "Shorts", count: 18 },
// //   { category: "Tutorials", count: 8 },
// //   { category: "Lectures", count: 15 },
// //   { category: "Other", count: 2 },
// // ]

// // export default function DashboardPage() {
// //   const router = useRouter()
// //   const [isLoading, setIsLoading] = useState(true)

// //   useEffect(() => {
// //     if (!isAuthenticated()) {
// //       router.push("/auth/login")
// //       return
// //     }
// //     setIsLoading(false)
// //   }, [router])

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-8">
// //       {/* Welcome Section */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-foreground">Learn AI With Uzair - Dashboard</h1>
// //         <p className="text-muted-foreground mt-2">Track your YouTube channel performance and automation stats.</p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <Card className="hover:shadow-lg transition-shadow">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
// //             <Video className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">43</div>
// //             <p className="text-xs text-muted-foreground">+10 from last week</p>
// //           </CardContent>
// //         </Card>

// //         <Card className="hover:shadow-lg transition-shadow">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
// //             <MessageCircle className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">19</div>
// //             <p className="text-xs text-muted-foreground">+8 this week</p>
// //           </CardContent>
// //         </Card>

// //         <Card className="hover:shadow-lg transition-shadow">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
// //             <Users className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">24</div>
// //             <p className="text-xs text-muted-foreground">+2 this month</p>
// //           </CardContent>
// //         </Card>

// //         <Card className="hover:shadow-lg transition-shadow">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Views</CardTitle>
// //             <Eye className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">2,120</div>
// //             <p className="text-xs text-muted-foreground">+304 from last week</p>
// //           </CardContent>
// //         </Card>
// //       </div>

// //             {/* First Row - Two Main Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Monthly Analytics Overview</CardTitle>
// //             <CardDescription className="text-sm">Views and subscriber growth over time</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <ChartContainer
// //               config={{
// //                 views: {
// //                   label: "Views",
// //                   color: "#00C951",
// //                 },
// //                 subscribers: {
// //                   label: "Subscribers",
// //                   color: "#00A843",
// //                 },
// //               }}
// //               className="h-[200px] sm:h-[250px] md:h-[300px]"
// //             >
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={monthlyAnalyticsData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //                   <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
// //                   <YAxis stroke="#9CA3AF" fontSize={10} />
// //                   <ChartTooltip content={<ChartTooltipContent />} />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="views"
// //                     stroke="#00C951"
// //                     strokeWidth={2}
// //                     dot={{ fill: "#00C951", strokeWidth: 2, r: 3 }}
// //                     activeDot={{ r: 5, stroke: "#00C951", strokeWidth: 2 }}
// //                     name="Views"
// //                   />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="subscribers"
// //                     stroke="#00A843"
// //                     strokeWidth={2}
// //                     dot={{ fill: "#00A843", strokeWidth: 2, r: 3 }}
// //                     activeDot={{ r: 5, stroke: "#00A843", strokeWidth: 2 }}
// //                     name="Subscribers"
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </ChartContainer>
// //           </CardContent>
// //         </Card>

// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Top Performing Videos</CardTitle>
// //             <CardDescription className="text-sm">Video performance by views and engagement</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <ChartContainer
// //               config={{
// //                 views: {
// //                   label: "Views",
// //                   color: "#00C951",
// //                 },
// //               }}
// //               className="h-[200px] sm:h-[250px] md:h-[300px]"
// //             >
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <BarChart data={topVideosData} layout="horizontal">
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //                   <XAxis type="number" stroke="#9CA3AF" fontSize={10} />
// //                   <YAxis dataKey="title" type="category" width={80} stroke="#9CA3AF" fontSize={9} />
// //                   <ChartTooltip content={<ChartTooltipContent />} />
// //                   <Bar dataKey="views" fill="#00C951" name="Views" radius={[0, 4, 4, 0]} />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </ChartContainer>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Second Row - Two Additional Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Content Categories Distribution</CardTitle>
// //             <CardDescription className="text-sm">Breakdown of content by category</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <ChartContainer
// //               config={{
// //                 value: {
// //                   label: "Videos",
// //                   color: "#00C951",
// //                 },
// //               }}
// //               className="h-[200px] sm:h-[250px] md:h-[300px]"
// //             >
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <PieChart>
// //                   <Pie
// //                     data={contentCategoriesData}
// //                     cx="50%"
// //                     cy="50%"
// //                     outerRadius={60}
// //                     fill="#00C951"
// //                     dataKey="value"
// //                     label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
// //                     labelLine={false}
// //                     fontSize={9}
// //                   >
// //                     {contentCategoriesData.map((entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={entry.color} />
// //                     ))}
// //                   </Pie>
// //                   <ChartTooltip content={<ChartTooltipContent />} />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </ChartContainer>
// //           </CardContent>
// //         </Card>

// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Growth Trends Over Time</CardTitle>
// //             <CardDescription className="text-sm">Cumulative growth in views and subscribers</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <ChartContainer
// //               config={{
// //                 totalViews: {
// //                   label: "Total Views",
// //                   color: "#00C951",
// //                 },
// //                 subscribers: {
// //                   label: "Subscribers",
// //                   color: "#00A843",
// //                 },
// //               }}
// //               className="h-[200px] sm:h-[250px] md:h-[300px]"
// //             >
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <AreaChart data={growthTrendsData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //                   <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
// //                   <YAxis stroke="#9CA3AF" fontSize={10} />
// //                   <ChartTooltip content={<ChartTooltipContent />} />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="totalViews"
// //                     stackId="1"
// //                     stroke="#00C951"
// //                     fill="#00C951"
// //                     fillOpacity={0.6}
// //                     name="Total Views"
// //                   />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="subscribers"
// //                     stackId="2"
// //                     stroke="#00A843"
// //                     fill="#00A843"
// //                     fillOpacity={0.8}
// //                     name="Subscribers"
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             </ChartContainer>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Channel Performance */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Channel Performance</CardTitle>
// //             <CardDescription className="text-sm">Weekly analytics breakdown</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <ChartContainer
// //               config={{
// //                 views: {
// //                   label: "Views",
// //                   color: "#00C951",
// //                 },
// //                 engagement: {
// //                   label: "Engagement Rate",
// //                   color: "#00A843",
// //                 },
// //               }}
// //               className="h-[200px] sm:h-[250px] md:h-[300px]"
// //             >
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={chartData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //                   <XAxis dataKey="week" stroke="#9CA3AF" fontSize={10} />
// //                   <YAxis stroke="#9CA3AF" fontSize={10} />
// //                   <ChartTooltip content={<ChartTooltipContent />} />
// //                   <Line type="monotone" dataKey="views" stroke="#00C951" strokeWidth={2} name="Views" />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="engagement"
// //                     stroke="#00A843"
// //                     strokeWidth={2}
// //                     name="Engagement %"
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </ChartContainer>
// //           </CardContent>
// //         </Card>

// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">View Distribution</CardTitle>
// //             <CardDescription className="text-sm">Video performance by view ranges</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <ChartContainer
// //               config={{
// //                 count: {
// //                   label: "Videos",
// //                   color: "#00C951",
// //                 },
// //               }}
// //               className="h-[200px] sm:h-[250px] md:h-[300px]"
// //             >
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <BarChart data={performanceData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //                   <XAxis dataKey="category" stroke="#9CA3AF" fontSize={10} />
// //                   <YAxis stroke="#9CA3AF" fontSize={10} />
// //                   <ChartTooltip content={<ChartTooltipContent />} />
// //                   <Bar dataKey="count" fill="#00C951" name="Videos" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </ChartContainer>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Channel Insights</CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Avg Views/Video</span>
// //               <span className="font-medium">49.3</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Engagement Rate</span>
// //               <span className="font-medium">2.08%</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Upload Frequency</span>
// //               <span className="font-medium">3.4/month</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Total Watch Time</span>
// //               <span className="font-medium">9.01 hours</span>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Content Breakdown</CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Shorts</span>
// //               <span className="font-medium">18 videos</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Tutorials</span>
// //               <span className="font-medium">8 videos</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Lectures</span>
// //               <span className="font-medium">15 videos</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Other</span>
// //               <span className="font-medium">2 videos</span>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card className="w-full">
// //           <CardHeader>
// //             <CardTitle className="text-base lg:text-lg">Growth Metrics</CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Subscriber Growth</span>
// //               <span className="font-medium text-green-600">+1.89/month</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">View Growth</span>
// //               <span className="font-medium text-green-600">+167.37/month</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Channel Age</span>
// //               <span className="font-medium">12.7 months</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-sm text-muted-foreground">Health Score</span>
// //               <span className="font-medium">11.16/100</span>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }











// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Upload, Video, Users, MessageCircle, Eye } from "lucide-react"
// import Link from "next/link"
// import { isAuthenticated } from "@/lib/auth"
// import {
//   Line,
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Bar,
//   BarChart,
//   Area,
//   AreaChart,
//   Pie,
//   PieChart,
//   Cell,
// } from "recharts"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// const monthlyAnalyticsData = [
//   { month: "Jan", views: 12000, subscribers: 18 },
//   { month: "Feb", views: 18500, subscribers: 19 },
//   { month: "Mar", views: 15200, subscribers: 19 },
//   { month: "Apr", views: 24800, subscribers: 20 },
//   { month: "May", views: 22100, subscribers: 21 },
//   { month: "Jun", views: 29500, subscribers: 22 },
//   { month: "Jul", views: 34200, subscribers: 22 },
//   { month: "Aug", views: 32800, subscribers: 23 },
//   { month: "Sep", views: 39100, subscribers: 23 },
//   { month: "Oct", views: 37600, subscribers: 24 },
//   { month: "Nov", views: 42300, subscribers: 24 },
//   { month: "Dec", views: 44100, subscribers: 24 },
// ]

// const topVideosData = [
//   { title: "Python Tutorial #8", views: 525, engagement: 0.95 },
//   { title: "JavaScript Basics", views: 312, engagement: 1.64 },
//   { title: "React Hooks Guide", views: 287, engagement: 2.1 },
//   { title: "CSS Grid Layout", views: 198, engagement: 1.2 },
//   { title: "Node.js Setup", views: 156, engagement: 0.8 },
// ]

// const contentCategoriesData = [
//   { name: "Python Tutorials", value: 21, color: "#00C951" },
//   { name: "JavaScript", value: 25, color: "#00A843" },
//   { name: "Web Development", value: 18, color: "#008735" },
//   { name: "Programming Shorts", value: 15, color: "#006627" },
//   { name: "OOP Concepts", value: 8, color: "#004519" },
// ]

// const growthTrendsData = [
//   { month: "Jan", totalViews: 12000, subscribers: 18, engagement: 1.2 },
//   { month: "Feb", totalViews: 30500, subscribers: 19, engagement: 1.4 },
//   { month: "Mar", totalViews: 45700, subscribers: 19, engagement: 1.1 },
//   { month: "Apr", totalViews: 70500, subscribers: 20, engagement: 1.8 },
//   { month: "May", totalViews: 92600, subscribers: 21, engagement: 1.6 },
//   { month: "Jun", totalViews: 122100, subscribers: 22, engagement: 2.1 },
//   { month: "Jul", totalViews: 156300, subscribers: 22, engagement: 1.9 },
//   { month: "Aug", totalViews: 189100, subscribers: 23, engagement: 2.3 },
//   { month: "Sep", totalViews: 228200, subscribers: 23, engagement: 2.0 },
//   { month: "Oct", totalViews: 265800, subscribers: 24, engagement: 1.7 },
//   { month: "Nov", totalViews: 308100, subscribers: 24, engagement: 2.2 },
//   { month: "Dec", totalViews: 352200, subscribers: 24, engagement: 2.4 },
// ]

// const chartData = [
//   { week: "Week 1", views: 1000, engagement: 1.5 },
//   { week: "Week 2", views: 1500, engagement: 1.7 },
//   { week: "Week 3", views: 2000, engagement: 1.9 },
//   { week: "Week 4", views: 2500, engagement: 2.1 },
// ]

// const performanceData = [
//   { category: "Shorts", count: 18 },
//   { category: "Tutorials", count: 8 },
//   { category: "Lectures", count: 15 },
//   { category: "Other", count: 2 },
// ]

// export default function DashboardPage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       router.push("/auth/login")
//       return
//     }
//     setIsLoading(false)
//   }, [router])

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Learn AI With Uzair - Dashboard</h1>
//         <p className="text-muted-foreground mt-2">Track your YouTube channel performance and automation stats.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="hover:shadow-lg transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
//             <Video className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">43</div>
//             <p className="text-xs text-muted-foreground">+10 from last week</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
//             <MessageCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">19</div>
//             <p className="text-xs text-muted-foreground">+8 this week</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">24</div>
//             <p className="text-xs text-muted-foreground">+2 this month</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Views</CardTitle>
//             <Eye className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">2,120</div>
//             <p className="text-xs text-muted-foreground">+304 from last week</p>
//           </CardContent>
//         </Card>
//       </div>

//             {/* First Row - Two Main Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Monthly Analytics Overview</CardTitle>
//             <CardDescription className="text-sm">Views and subscriber growth over time</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 views: {
//                   label: "Views",
//                   color: "#00C951",
//                 },
//                 subscribers: {
//                   label: "Subscribers",
//                   color: "#00A843",
//                 },
//               }}
//               className="h-[200px] sm:h-[250px] md:h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={monthlyAnalyticsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                   <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
//                   <YAxis stroke="#9CA3AF" fontSize={10} />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Line
//                     type="monotone"
//                     dataKey="views"
//                     stroke="#00C951"
//                     strokeWidth={2}
//                     dot={{ fill: "#00C951", strokeWidth: 2, r: 3 }}
//                     activeDot={{ r: 5, stroke: "#00C951", strokeWidth: 2 }}
//                     name="Views"
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="subscribers"
//                     stroke="#00A843"
//                     strokeWidth={2}
//                     dot={{ fill: "#00A843", strokeWidth: 2, r: 3 }}
//                     activeDot={{ r: 5, stroke: "#00A843", strokeWidth: 2 }}
//                     name="Subscribers"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Top Performing Videos</CardTitle>
//             <CardDescription className="text-sm">Video performance by views and engagement</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 views: {
//                   label: "Views",
//                   color: "#00C951",
//                 },
//               }}
//               className="h-[200px] sm:h-[250px] md:h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={topVideosData} layout="horizontal">
//                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                   <XAxis type="number" stroke="#9CA3AF" fontSize={10} />
//                   <YAxis dataKey="title" type="category" width={80} stroke="#9CA3AF" fontSize={9} />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Bar dataKey="views" fill="#00C951" name="Views" radius={[0, 4, 4, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Second Row - Two Additional Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Content Categories Distribution</CardTitle>
//             <CardDescription className="text-sm">Breakdown of content by category</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 value: {
//                   label: "Videos",
//                   color: "#00C951",
//                 },
//               }}
//               className="h-[200px] sm:h-[250px] md:h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={contentCategoriesData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={60}
//                     fill="#00C951"
//                     dataKey="value"
//                     label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
//                     labelLine={false}
//                     fontSize={9}
//                   >
//                     {contentCategoriesData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Growth Trends Over Time</CardTitle>
//             <CardDescription className="text-sm">Cumulative growth in views and subscribers</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 totalViews: {
//                   label: "Total Views",
//                   color: "#00C951",
//                 },
//                 subscribers: {
//                   label: "Subscribers",
//                   color: "#00A843",
//                 },
//               }}
//               className="h-[200px] sm:h-[250px] md:h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={growthTrendsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                   <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
//                   <YAxis stroke="#9CA3AF" fontSize={10} />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Area
//                     type="monotone"
//                     dataKey="totalViews"
//                     stackId="1"
//                     stroke="#00C951"
//                     fill="#00C951"
//                     fillOpacity={0.6}
//                     name="Total Views"
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="subscribers"
//                     stackId="2"
//                     stroke="#00A843"
//                     fill="#00A843"
//                     fillOpacity={0.8}
//                     name="Subscribers"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Channel Performance */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Channel Performance</CardTitle>
//             <CardDescription className="text-sm">Weekly analytics breakdown</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 views: {
//                   label: "Views",
//                   color: "#00C951",
//                 },
//                 engagement: {
//                   label: "Engagement Rate",
//                   color: "#00A843",
//                 },
//               }}
//               className="h-[200px] sm:h-[250px] md:h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                   <XAxis dataKey="week" stroke="#9CA3AF" fontSize={10} />
//                   <YAxis stroke="#9CA3AF" fontSize={10} />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Line type="monotone" dataKey="views" stroke="#00C951" strokeWidth={2} name="Views" />
//                   <Line
//                     type="monotone"
//                     dataKey="engagement"
//                     stroke="#00A843"
//                     strokeWidth={2}
//                     name="Engagement %"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">View Distribution</CardTitle>
//             <CardDescription className="text-sm">Video performance by view ranges</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 count: {
//                   label: "Videos",
//                   color: "#00C951",
//                 },
//               }}
//               className="h-[200px] sm:h-[250px] md:h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={performanceData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                   <XAxis dataKey="category" stroke="#9CA3AF" fontSize={10} />
//                   <YAxis stroke="#9CA3AF" fontSize={10} />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Bar dataKey="count" fill="#00C951" name="Videos" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Channel Insights</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Avg Views/Video</span>
//               <span className="font-medium">49.3</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Engagement Rate</span>
//               <span className="font-medium">2.08%</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Upload Frequency</span>
//               <span className="font-medium">3.4/month</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Total Watch Time</span>
//               <span className="font-medium">9.01 hours</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Content Breakdown</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Shorts</span>
//               <span className="font-medium">18 videos</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Tutorials</span>
//               <span className="font-medium">8 videos</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Lectures</span>
//               <span className="font-medium">15 videos</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Other</span>
//               <span className="font-medium">2 videos</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-base lg:text-lg">Growth Metrics</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Subscriber Growth</span>
//               <span className="font-medium text-green-600">+1.89/month</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">View Growth</span>
//               <span className="font-medium text-green-600">+167.37/month</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Channel Age</span>
//               <span className="font-medium">12.7 months</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">Health Score</span>
//               <span className="font-medium">11.16/100</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }



import DashboardOverview from "@/components/dashboard/overview/DashboardOverview"

export default function DashboardPage() {
  return <DashboardOverview />
}