import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const historyCategory = await prisma.category.create({
    data: {
      title: 'History',
    },
  });

  const geoCategory = await prisma.category.create({
    data: {
      title: 'Geography',
    },
  });

  const languageCategory = await prisma.category.create({
    data: {
      title: 'Language',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane',
      surname: 'Doe',
      email: 'jane.doe@example.com',
      password: 'hashed_password',
      isAdmin: false,
    },
  });

  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'World War II',
      imgUrl: 'https://example.com/ww2.jpg',
      description: 'A quiz about World War II.',
      categoryId: historyCategory.id,
      questions: {
        create: [
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
            answer: 'Germany, Italy, Japan',
          },
        ],
      },
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'Geography Basics',
      imgUrl: 'https://example.com/geo.jpg',
      description: 'A quiz about basic geography.',
      categoryId: geoCategory.id,
      questions: {
        create: [
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
        ],
      },
    },
  });

  // Create some quiz results for the users
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
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
