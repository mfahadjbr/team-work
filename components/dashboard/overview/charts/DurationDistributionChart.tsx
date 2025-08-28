import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

interface DurationDistributionChartProps {
  durationDistribution: Record<string, number>
}

export default function DurationDistributionChart({ durationDistribution }: DurationDistributionChartProps) {
  const durationDistributionData = Object.entries(durationDistribution).map(([range, count]) => ({
    range,
    count,
    color: range === '0-5min' ? '#00C951' : range === '5-15min' ? '#00A843' : range === '15-30min' ? '#008735' : '#006627'
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Video Duration Distribution</CardTitle>
        <CardDescription>Breakdown of your content by length</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={durationDistributionData}>
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
            <Bar dataKey="count" fill="#00A843" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
