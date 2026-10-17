import type { WeatherErrorCode } from '../types/weather'

/** All user-facing text. The UI is Arabic-only. */
export const ar = {
  appTitle: 'حالة الطقس',
  appSubtitle: 'ابحث عن أي مدينة لمعرفة الطقس الآن',
  searchLabel: 'اسم المدينة',
  searchPlaceholder: 'مثال: القاهرة، الرياض، دبي',
  searchButton: 'بحث',
  emptyTitle: 'ابدأ بالبحث عن مدينة',
  emptyHint: 'اكتب اسم المدينة بالعربية أو الإنجليزية ثم اضغط «بحث».',
  loading: 'جارٍ جلب بيانات الطقس…',
  feelsLike: 'الإحساس الفعلي',
  humidity: 'الرطوبة',
  wind: 'سرعة الرياح',
  descriptionFallback: 'لا يتوفر وصف للطقس',
  weatherIconAlt: (description: string) => `أيقونة الطقس: ${description}`,
  celsius: '°م',
  windUnit: 'م/ث',
  errorTitle: 'تعذّر عرض الطقس',
  retry: 'حاول مرة أخرى',
  errors: {
    NOT_FOUND: 'لم نعثر على هذه المدينة. تحقّق من الاسم وحاول مجددًا.',
    MISSING_API_KEY: 'مفتاح خدمة الطقس غير مُعدّ. يُرجى إضافته إلى ملف الإعدادات.',
    INVALID_API_KEY: 'مفتاح خدمة الطقس غير صالح أو لم يُفعَّل بعد.',
    NETWORK: 'تعذّر الاتصال بالخادم. تحقّق من اتصالك بالإنترنت.',
    UNKNOWN: 'حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.',
  } satisfies Record<WeatherErrorCode, string>,
}

const regionNames = new Intl.DisplayNames(['ar'], { type: 'region' })

export function countryName(code: string): string {
  try {
    return regionNames.of(code) ?? code
  } catch {
    return code
  }
}
