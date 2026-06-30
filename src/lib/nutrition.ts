import { NutritionPlan, AthleteFitness } from '@/types'

export function generateNutritionPlan(weightKg: number, trainingHours: number): NutritionPlan {
  // Estimación de calorías para triatleta en período de entrenamiento
  const bmr = weightKg * 24
  const activityMultiplier = trainingHours > 10 ? 1.9 : trainingHours > 7 ? 1.75 : 1.6
  const totalCalories = Math.round(bmr * activityMultiplier)

  const protein = Math.round(weightKg * 2.0) // 2g/kg: mantener músculo y definición (fibrado + fuerte)
  const fat = Math.round((totalCalories * 0.25) / 9)
  const carbs = Math.round((totalCalories - protein * 4 - fat * 9) / 4)

  return {
    calories: totalCalories,
    protein,
    carbs,
    fat,
    meals: [
      {
        name: 'Desayuno Pre-Entreno',
        time: '06:30',
        foods: [
          '80g avena con leche semidesnatada',
          '1 plátano',
          '2 huevos revueltos',
          '1 cucharada de mantequilla de cacahuete',
          'Café negro',
        ],
        calories: Math.round(totalCalories * 0.22),
        protein: Math.round(protein * 0.22),
        carbs: Math.round(carbs * 0.30),
        fat: Math.round(fat * 0.20),
      },
      {
        name: 'Media Mañana / Post-Entreno',
        time: '10:00',
        foods: [
          '250g yogur griego 0%',
          '30g granola sin azúcar',
          '100g frutas del bosque',
          '20g proteína en polvo (si se entrena por la mañana)',
        ],
        calories: Math.round(totalCalories * 0.15),
        protein: Math.round(protein * 0.25),
        carbs: Math.round(carbs * 0.12),
        fat: Math.round(fat * 0.08),
      },
      {
        name: 'Comida',
        time: '13:30',
        foods: [
          '200g pechuga de pollo a la plancha o salmón',
          '150g arroz integral o quinoa',
          'Ensalada grande con AOVE',
          '2 rebanadas pan integral (días de volumen alto)',
        ],
        calories: Math.round(totalCalories * 0.30),
        protein: Math.round(protein * 0.30),
        carbs: Math.round(carbs * 0.28),
        fat: Math.round(fat * 0.30),
      },
      {
        name: 'Merienda',
        time: '17:00',
        foods: [
          '30g frutos secos mixtos',
          '1 manzana o pera',
          'Opcional: batido proteínas si se entrena tarde',
        ],
        calories: Math.round(totalCalories * 0.10),
        protein: Math.round(protein * 0.10),
        carbs: Math.round(carbs * 0.10),
        fat: Math.round(fat * 0.20),
      },
      {
        name: 'Cena',
        time: '20:30',
        foods: [
          '200g pescado blanco o carne magra',
          '200g verduras asadas o al vapor',
          '150g patata cocida o boniato',
          'AOVE para cocinar',
        ],
        calories: Math.round(totalCalories * 0.23),
        protein: Math.round(protein * 0.13),
        carbs: Math.round(carbs * 0.20),
        fat: Math.round(fat * 0.22),
      },
    ],
    raceNutrition: {
      swim: [
        'No comer nada en los 30 min previos a entrar al agua',
        'Hidratarse bien 2h antes (500ml agua + electrolitos)',
        'Gel energético 15 min antes de la salida',
      ],
      bike: [
        '1 gel (25g HC) cada 30 min → 60-75g HC/hora',
        '750ml bebida isotónica por hora (Málaga puede ser caluroso)',
        'Plátano o dátiles cada hora para HC sólidos',
        'Sales: 1 pastilla de sodio/hora en calor',
        'Total: 3-4 bidones en 90 km',
      ],
      run: [
        'Gel cada 5 km (25g HC)',
        'Sorbo de agua/isotónica en cada avituallamiento',
        'Cola o Pepsi en km 15+ para cafeína y HC rápidos',
        'Reducir sólidos, priorizar líquidos',
      ],
      total_carbs_per_hour: 70,
      total_fluids_per_hour: 750,
    },
  }
}

export const SUPPLEMENT_STACK = [
  { name: 'Proteína Whey', dose: '20-30g', timing: 'Post-entreno', reason: 'Recuperación muscular y síntesis proteica' },
  { name: 'Creatina Monohidrato', dose: '5g', timing: 'Diario', reason: 'Fuerza, potencia y recuperación' },
  { name: 'Beta-Alanina', dose: '3.2g', timing: 'Pre-entreno', reason: 'Retrasa la fatiga muscular en esfuerzos Z4-Z5' },
  { name: 'Cafeína', dose: '3mg/kg', timing: '45 min antes entrenamientos clave', reason: 'Rendimiento aeróbico y enfoque mental' },
  { name: 'Omega-3', dose: '2g EPA+DHA', timing: 'Con comida', reason: 'Antiinflamatorio, salud articular y cardiovascular' },
  { name: 'Vitamina D3 + K2', dose: '2000 UI D3 / 100mcg K2', timing: 'Con desayuno', reason: 'Huesos, sistema inmune, función muscular' },
  { name: 'Magnesio Bisglicinato', dose: '300mg', timing: 'Antes de dormir', reason: 'Calidad del sueño, recuperación y calambres' },
  { name: 'Sales de Electrolitos', dose: 'Según sudor', timing: 'Durante entrenamientos >60 min', reason: 'Hidratación, prevención de calambres' },
]
