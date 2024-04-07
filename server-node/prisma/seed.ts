import {prisma} from '../src/lib/prisma'

async function seed(){
    await prisma.event.create({
        data: {
            id:'507d555f-2681-471c-af2a-fcc7c1d7453a',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Evento de programação',
            maximumAttendees: 120
        }
    })
}

seed().then(()=>{
    console.log('Database seeded!')
    prisma.$disconnect()
})