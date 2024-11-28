import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, GraduationCap, User } from 'lucide-react'
import React, { useState } from 'react'

const studentInfo = {
  name: 'John Doe',
  year: '3rd Year',
  program: 'BS Civil Engineering',
  semester: '1st Semester 2023-2024',
}

const classData = [
  {
    id: '251533',
    code: 'CE 311',
    title: 'Structural Theory',
    units: 3,
    hours: 0,
    instructor: 'Cisneros, Amie Lou Gonzaga',
    room: 'N/A',
    schedule: 'M,W 8:00A-9:30A',
    section: 'BSCE-3A',
    color: 'bg-blue-100',
    progress: 65,
  },
]

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('all')

  const filteredClasses = classData.filter(
    (cls) => filter === 'all' || cls.code.startsWith(filter)
  )

  return (
    <div>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">
          {studentInfo.name}'s Dashboard
        </h1>
        <p className="text-gray-600">
          {studentInfo.year} | {studentInfo.program} | {studentInfo.semester}
        </p>
      </header>

      <Tabs defaultValue="classes" className="mb-6">
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>
        <TabsContent value="classes">
          <div className="flex items-center justify-between mb-4">
            <Select onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="CE">Civil Engineering</SelectItem>
                <SelectItem value="GE">General Education</SelectItem>
                <SelectItem value="ESurv">Surveying</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" /> Sync to Calendar
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((cls) => (
              <Card
                key={cls.id}
                className={`${cls.color} hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{cls.title}</span>
                    <Badge variant="secondary">{cls.code}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">{cls.instructor}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{cls.schedule}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span className="text-sm">{cls.units} units</span>
                  </div>
                  <Progress value={cls.progress} className="mt-2" />
                  <p className="mt-1 text-xs text-right">
                    Progress: {cls.progress}%
                  </p>
                  <Button variant="outline" className="w-full mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="schedule">
          <div className="grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="p-4 border rounded-lg">
                <h3 className="mb-2 font-bold">{day}</h3>
                {classData
                  .filter((cls) => cls.schedule.includes(day.slice(0, 1)))
                  .map((cls) => (
                    <div
                      key={cls.id}
                      className={`${cls.color} p-2 mb-2 rounded-md text-sm`}
                    >
                      <p className="font-semibold">{cls.code}</p>
                      <p>{cls.schedule.split(' ')[1]}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="grades">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Current GPA</h3>
              <span className="text-2xl font-bold">3.75</span>
            </div>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground">
              You're in the top 25% of your class!
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {classData.map((cls) => (
                <Card key={cls.id}>
                  <CardHeader>
                    <CardTitle>
                      {cls.code}: {cls.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span>Grade: A-</span>
                      <Badge>3.7</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full">Calculate GPA</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
