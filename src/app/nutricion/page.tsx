'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { generateNutritionPlan, SUPPLEMENT_STACK } from '@/lib/nutrition'
import { Meal } from '@/types'

function MealCard({ meal }: { meal: Meal }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#1f2937', border: '1px solid #374151' }}>
      <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors" onClick={() => setOpen(!open)}>
        <div>
          <div className="text-white font-medium text-sm">{meal.name}</div>
          <div className="text-gray-400 text-xs">{meal.time} · {meal.calories} kcal</div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-blue-400">{meal.protein}g P</span>
          <span className="text-amber-400">{meal.carbs}g C</span>
          <span className="text-green-400">{meal.fat}g G</span>
          <span className="text-gray-500">{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-700">
          <ul className="mt-3 space-y-1">
            {meal.foods.map((food, i) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span> {food}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Nutricion() {
  const [weight, setWeight] = useState(67)
  const [hours, setHours] = useState(8.5)
  const plan = generateNutritionPlan(weight, hours)

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white">Plan Nutricional</h1>
          <p className="text-gray-400 mt-1">Alimentación para rendimiento y composición corporal</p>
        </div>

        <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <h2 className="text-white font-bold mb-4">Personaliza tu plan</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Peso corporal: <span className="text-white font-bold">{weight} kg</span></label>
              <input type="range" min="55" max="100" value={weight} onChange={e => setWeight(Number(e.target.value))}
                className="w-full accent-blue-500" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Horas de entreno/semana: <span className="text-white font-bold">{hours}h</span></label>
              <input type="range" min="4" max="15" step="0.5" value={hours} onChange={e => setHours(Number(e.target.value))}
                className="w-full accent-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Calorías totales', value: `${plan.calories} kcal`, color: 'text-white', bg: '#111827' },
            { label: 'Proteína', value: `${plan.protein}g`, color: 'text-blue-400', bg: '#0d1b35' },
            { label: 'Carbohidratos', value: `${plan.carbs}g`, color: 'text-amber-400', bg: '#2e2a00' },
            { label: 'Grasas', value: `${plan.fat}g`, color: 'text-green-400', bg: '#1a2e1a' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-5 text-center" style={{ background: stat.bg, border: '1px solid #1f2937' }}>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-white font-bold text-lg">Comidas diarias</h2>
            {plan.meals.map((meal, i) => <MealCard key={i} meal={meal} />)}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <h2 className="text-white font-bold text-lg mb-4">Nutrición de carrera – Ironman 70.3</h2>
              {[
                { phase: '🏊 Natación (1.9 km)', items: plan.raceNutrition.swim, color: '#0d1b35', border: '#1e3a5f' },
                { phase: '🚴 Ciclismo (90 km)', items: plan.raceNutrition.bike, color: '#2e2a00', border: '#78350f' },
                { phase: '🏃 Carrera (21.1 km)', items: plan.raceNutrition.run, color: '#1a2e1a', border: '#166534' },
              ].map(seg => (
                <div key={seg.phase} className="mb-4 p-4 rounded-xl" style={{ background: seg.color, border: `1px solid ${seg.border}` }}>
                  <div className="text-white font-medium text-sm mb-2">{seg.phase}</div>
                  <ul className="space-y-1">
                    {seg.items.map((item, i) => (
                      <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded-xl text-center" style={{ background: '#1f2937' }}>
                  <div className="text-amber-400 font-bold">{plan.raceNutrition.total_carbs_per_hour}g</div>
                  <div className="text-gray-400 text-xs">HC/hora objetivo</div>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: '#1f2937' }}>
                  <div className="text-blue-400 font-bold">{plan.raceNutrition.total_fluids_per_hour}ml</div>
                  <div className="text-gray-400 text-xs">Líquidos/hora</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <h2 className="text-white font-bold text-lg mb-4">Stack de suplementación</h2>
              <div className="space-y-3">
                {SUPPLEMENT_STACK.map((sup, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{ background: '#1f2937' }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">{sup.name}</span>
                      <span className="text-amber-400 text-xs font-bold">{sup.dose}</span>
                    </div>
                    <div className="text-blue-300 text-xs">{sup.timing}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{sup.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
