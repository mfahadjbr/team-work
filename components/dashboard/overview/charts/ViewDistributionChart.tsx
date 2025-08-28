import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

interface ViewDistributionChartProps {
  viewDistribution: Record<string, number>
}

export default function ViewDistributionChart({ viewDistribution }: ViewDistributionChartProps) {
  const viewDistributionData = Object.entries(viewDistribution).map(([range, count]) => ({
    range,
    count,
    color: range === '0-100' ? '#00C951' : range === '101-500' ? '#00A843' : range === '501-1000' ? '#008735' : '#006627'
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">View Distribution</CardTitle>
        <CardDescription>How your videos perform across view ranges</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={viewDistributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="range" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#f9fafb'
              }}
            />
            <Bar dataKey="count" fill="#00C951" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
