import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface ContentTypeChartProps {
  contentTypeBreakdown: Record<string, number>
}

export default function ContentTypeChart({ contentTypeBreakdown }: ContentTypeChartProps) {
  const contentTypeData = Object.entries(contentTypeBreakdown).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: type === 'shorts' ? '#00C951' : type === 'tutorials' ? '#00A843' : type === 'lectures' ? '#008735' : '#006627'
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Content Type Distribution</CardTitle>
        <CardDescription>Breakdown of your content by type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={contentTypeData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#00C951"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
              fontSize={12}
            >
              {contentTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#f9fafb'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
