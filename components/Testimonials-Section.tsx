import { Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";


export function TestimonialsSection() {
  return (
<section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Creators Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful YouTube creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                <CardDescription>Tech Reviewer • 500K subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "This tool has revolutionized my workflow. I can now focus on creating content while the AI handles
                  all the tedious optimization work."
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">Mike Chen</CardTitle>
                <CardDescription>Gaming Creator • 1.2M subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "The AI-generated thumbnails have increased my click-through rate by 40%. The scheduling feature is a
                  game-changer."
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">Emma Davis</CardTitle>
                <CardDescription>Lifestyle Vlogger • 800K subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "I've saved 10+ hours per week since using this platform. The SEO optimization has doubled my organic
                  reach."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }
