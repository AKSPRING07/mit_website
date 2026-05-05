import culturalImage from "../assets/img/home_1/post_1.jpg";
import readingImage from "../assets/img/home_1/post_2.jpg";
import quizImage from "../assets/img/home_1/post_3.jpg";
import electoralImage from "../assets/img/home_1/post_4.jpg";

export const fallbackAssociations = [
  {
    id: "cultural",
    slug: "cultural",
    title: "Cultural Association",
    image: culturalImage,
    excerpt:
      "Promotes music, dance, fine arts, celebrations, and student talent through campus cultural activities.",
    content: `
      <p>The Cultural Association encourages students to participate in music, dance, stage programs, fine arts, and festival celebrations across the academic year.</p>
      <p>It creates a vibrant campus atmosphere by organizing cultural events, talent showcases, and inter-department participation opportunities that build confidence and teamwork.</p>
      <ul>
        <li>Organizes cultural festivals and annual day performances</li>
        <li>Encourages student creativity, expression, and stage confidence</li>
        <li>Supports collaborative participation in college celebrations</li>
      </ul>
    `,
    link: "/associations/cultural",
  },
  {
    id: "reading",
    slug: "reading",
    title: "Reading Association",
    image: readingImage,
    excerpt:
      "Builds reading habits, communication skills, and academic curiosity through discussions and literary activities.",
    content: `
      <p>The Reading Association develops a strong reading culture among students by encouraging access to books, journals, articles, and discussion-based learning.</p>
      <p>It helps students improve language confidence, comprehension, and awareness of current affairs through shared reading activities.</p>
      <ul>
        <li>Conducts reading circles and book-based discussions</li>
        <li>Improves vocabulary, comprehension, and presentation skills</li>
        <li>Promotes academic and personal growth through reading habits</li>
      </ul>
    `,
    link: "/associations/reading",
  },
  {
    id: "quiz",
    slug: "quiz",
    title: "Quiz Association",
    image: quizImage,
    excerpt:
      "Encourages knowledge-building, current affairs awareness, and healthy competition through quiz events.",
    content: `
      <p>The Quiz Association provides a platform for students to strengthen general knowledge, technical awareness, and analytical thinking through engaging competitions.</p>
      <p>It motivates students to stay informed and participate confidently in intra-college and inter-college quiz programs.</p>
      <ul>
        <li>Organizes technical and general knowledge quiz contests</li>
        <li>Develops quick thinking and team coordination</li>
        <li>Promotes competitive learning in an enjoyable format</li>
      </ul>
    `,
    link: "/associations/quiz",
  },
  {
    id: "electoral-literacy",
    slug: "electoral-literacy",
    title: "Electoral Literacy Club",
    image: electoralImage,
    excerpt:
      "Creates awareness about democratic values, voting rights, and civic responsibility among students.",
    content: `
      <p>The Electoral Literacy Club creates awareness about elections, democratic participation, and the value of responsible citizenship.</p>
      <p>It guides students to understand the voting process, constitutional values, and the importance of informed participation in democracy.</p>
      <ul>
        <li>Promotes voter awareness and civic responsibility</li>
        <li>Conducts awareness sessions on democracy and elections</li>
        <li>Encourages students to become informed and active citizens</li>
      </ul>
    `,
    link: "/associations/electoral-literacy",
  },
];

export const findFallbackAssociationBySlug = (slug) =>
  fallbackAssociations.find((item) => item.slug === slug);
