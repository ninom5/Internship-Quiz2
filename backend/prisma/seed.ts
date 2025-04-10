import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const historyCategory = await prisma.category.create({
    data: {
      title: 'History',
      imgUrl:
        'https://th.bing.com/th/id/OIP.Y9bFo0QzbeMFP4ESguIJCwHaEK?w=308&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    },
  });

  const geoCategory = await prisma.category.create({
    data: {
      title: 'Geography',
      imgUrl:
        'https://th.bing.com/th/id/OIP.NFjS-HAHTkMHPSKWboOCLwHaDt?w=311&h=175&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    },
  });

  const languageCategory = await prisma.category.create({
    data: {
      title: 'Language',
      imgUrl:
        'https://th.bing.com/th/id/OIP.9zzi4xkvbtUuOFAH2mFZfgHaDx?w=339&h=178&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      password: '$2b$10$ilUIHEDBiFmGugSQlgEqP..crzGy0HRvm7qjZjkQWdlYNueKLCJO6',
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane',
      surname: 'Doe',
      email: 'jane.doe@example.com',
      password: '$2b$10$ilUIHEDBiFmGugSQlgEqP..crzGy0HRvm7qjZjkQWdlYNueKLCJO6',
      isAdmin: false,
    },
  });

  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'World War II',
      description: 'A quiz about World War II.',
      categoryId: historyCategory.id,
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'Geography Basics',
      description: 'A quiz about basic geography.',
      categoryId: geoCategory.id,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        text: 'When did World War II end?',
        type: 'SELECT',
        options: ['1945', '1944', '1943', '1942'],
        answer: '1945',
      },
      {
        text: 'Which countries were part of the Axis Powers?',
        type: 'SELECT',
        options: ['Germany', 'USA', 'Italy', 'Japan'],
        answer: 'Germany,Italy,Japan',
      },
      {
        text: 'What is the capital of France?',
        type: 'SELECT',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        answer: 'Paris',
      },
      {
        text: 'Which continent is Australia located on?',
        type: 'SELECT',
        options: ['Asia', 'Europe', 'Oceania', 'Africa'],
        answer: 'Oceania',
      },
      {
        text: 'How many continents are there?',
        type: 'SELECT',
        options: ['5', '6', '7', '8'],
        answer: '7',
      },
      {
        text: 'Select all prime numbers below 10.',
        type: 'CHECKBOX',
        options: ['2', '3', '5', '9'],
        answer: '2,3,5',
      },
      {
        text: 'Rate your satisfaction with the course.',
        type: 'SLIDER',
        options: [],
        minValue: 1,
        maxValue: 5,
        answer: '4',
      },
      {
        text: 'Which of these are programming languages?',
        type: 'CHECKBOX',
        options: ['Python', 'HTML', 'CSS', 'JavaScript'],
        answer: 'Python,JavaScript',
      },
      {
        text: 'What is 5 + 3?',
        type: 'SELECT',
        options: ['6', '7', '8', '9'],
        answer: '8',
      },
      {
        text: 'Select the even numbers.',
        type: 'RADIO',
        options: ['1', '2', '3', '4'],
        answer: '2,4',
      },
    ],
  });

  const allQuestions = await prisma.question.findMany();

  await prisma.quizQuestions.createMany({
    data: allQuestions.slice(0, 5).map((q) => ({
      quizId: quiz1.id,
      questionId: q.id,
    })),
  });

  await prisma.quizQuestions.createMany({
    data: allQuestions.slice(5).map((q) => ({
      quizId: quiz2.id,
      questionId: q.id,
    })),
  });

  await prisma.quizResult.create({
    data: {
      userId: user1.id,
      quizId: quiz1.id,
      score: 90,
    },
  });

  await prisma.quizResult.create({
    data: {
      userId: user2.id,
      quizId: quiz2.id,
      score: 80,
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(`Seeding failed: ${e}`);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
