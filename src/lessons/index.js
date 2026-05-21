// ============================================================
// รวมบทเรียนทุกภาษาไว้ที่นี่
// App.js สามารถ import จากที่เดียวได้: import { lessonsByLanguage } from './lessons';
// ============================================================

import { pythonLessons, pythonInfo } from './Python';
import { javaLessons, javaInfo } from './Java';

const lessonsByLanguage = {
  Python: { lessons: pythonLessons, info: pythonInfo },
  Java: { lessons: javaLessons, info: javaInfo },
};

const availableLanguages = Object.keys(lessonsByLanguage);

export { lessonsByLanguage, availableLanguages };
export default lessonsByLanguage;
