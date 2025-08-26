// import Button from "../../components/library/button/component"
// import Card from "../../components/library/card/component"
// import Input from "../../components/library/input/component"
import { Link } from 'react-router-dom'
import tableIMG from '../../../../public/table.png'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const Home = () => {
  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center px-6 pt-64">
        <motion.h1
          className="text-5xl font-bold text-balance tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >Design Your Projects Smarter with Serpant Schedule
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          A modern SaaS platform designed for engineers and teams. 
          Save time, stay organized, and scale effortlessly.
        </p>
        <div className="flex gap-4 pb-28">
          <Link to='/sign_up'><Button size="lg">Get Started</Button></Link>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
        {/* <div className="mt-16 w-full max-w-5xl border rounded-lg overflow-hidden shadow-lg p-8">
          <img src={ tableIMG } alt="" />
        </div> */}
      </section>
      <section className="px-6 py-48">
        <h2 className="text-3xl font-bold text-center mb-12">Why Serpant Schedule?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Fast & Reliable",
              text: "Optimized for performance and reliability, ensuring your workflow never slows down."
            },
            {
              title: "Collaborate Seamlessly",
              text: "Work together in real-time with built-in collaboration tools."
            },
            {
              title: "Scales with You",
              text: "From solo engineers to large teams, Serpant Schedule grows with your needs."
            }
          ].map((feature, i) => (
            <Card key={ i } className="p-6">
              <CardContent>
                <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                  { feature.title }
                </h3>
                <p className="text-gray-600">{ feature.text }</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="px-6 pb-64 bg-gradient-to-r text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-8">Be one of the many teams already using Serpant Schedule to supercharge their workflow.</p>
        <div className="flex justify-center gap-4">
          <Input
            placeholder="Enter your email"
            type="email"
            className="max-w-sm bg-white text-black"
          />
          <Button size="lg" variant="secondary">Start Free Trial</Button>
        </div>
      </section>
    </main>
  )
}

export default Home