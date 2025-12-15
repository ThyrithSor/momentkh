/**
 * Khmer Calendar Converter - C++ Implementation
 *
 * This file provides Gregorian to Khmer lunar calendar conversion.
 * It's a direct port of the Rust implementation in src/calendar/
 */

#include "khmer_calendar.h"
#include <iostream>

// ============================================================================
// Conversion Functions
// ============================================================================

int64_t ad_to_js(int64_t ad_year) {
    return ad_year - 638;
}

int64_t ad_to_be(int64_t ad_year) {
    return ad_year + 544;
}

int64_t be_to_ad(int64_t be_year) {
    return be_year - 544;
}

int64_t js_to_ad(int64_t js_year) {
    return js_year + 638;
}

int64_t be_to_js(int64_t be_year) {
    return be_year - 1182;
}

int64_t js_to_be(int64_t js_year) {
    return js_year + 1182;
}

// ============================================================================
// Calculation Functions
// ============================================================================

int64_t get_aharkun(int64_t be_year) {
    return ((be_year * 292207 + 499) / 800) + 4;
}

int64_t get_aharkun_mod(int64_t be_year) {
    return (be_year * 292207 + 499) % 800;
}

int64_t get_kromthupul(int64_t be_year) {
    return 800 - get_aharkun_mod(be_year);
}

int64_t get_avoman(int64_t be_year) {
    return (get_aharkun(be_year) * 11 + 25) % 692;
}

int64_t get_bodithey(int64_t be_year) {
    int64_t aharkun = get_aharkun(be_year);
    return (((aharkun * 11 + 25) / 692) + aharkun + 29) % 30;
}

bool get_is_solar_leap(int64_t be_year) {
    return get_kromthupul(be_year) <= 207;
}

bool get_is_leap_day_by_calculation(int64_t be_year) {
    int64_t avoman = get_avoman(be_year);
    bool is_solar_leap = get_is_solar_leap(be_year);

    if (avoman == 0 && get_avoman(be_year - 1) == 137) {
        return true;
    } else if (is_solar_leap) {
        return avoman < 127;
    } else if (avoman == 137 && get_avoman(be_year + 1) == 0) {
        return false;
    } else if (avoman < 138) {
        return true;
    } else {
        return false;
    }
}

bool get_is_leap_month(int64_t be_year) {
    int64_t bodithey = get_bodithey(be_year);
    int64_t bodithey_next_year = get_bodithey(be_year + 1);

    if (bodithey == 25 && bodithey_next_year == 5) {
        return false;
    }

    return (bodithey == 24 && bodithey_next_year == 6) ||
           (bodithey >= 25) ||
           (bodithey < 6);
}

LeapType get_leap_type(int64_t be_year) {
    if (get_is_leap_month(be_year)) {
        return LeapType::បង្គ្រប់១ខែ;
    } else if (get_is_leap_day_by_calculation(be_year)) {
        return LeapType::បង្គ្រប់១ថ្ងៃ;
    } else if (get_is_leap_month(be_year - 1)) {
        int64_t previous_year = be_year - 1;
        while (true) {
            if (get_is_leap_day_by_calculation(previous_year)) {
                return LeapType::បង្គ្រប់១ថ្ងៃ;
            }
            previous_year -= 1;
            if (!get_is_leap_month(previous_year)) {
                return LeapType::មិនបង្គ្រប់;
            }
        }
    } else {
        return LeapType::មិនបង្គ្រប់;
    }
}

// New year calculations
int64_t get_aharkun_js(int64_t js_year) {
    int64_t h = js_year * 292207 + 373;
    return (h / 800) + 1;
}

int64_t get_avoman_js(int64_t js_year) {
    return (get_aharkun_js(js_year) * 11 + 650) % 692;
}

int64_t get_kromthupul_js(int64_t js_year) {
    return 800 - ((292207 * js_year + 373) % 800);
}

int64_t get_bodithey_js(int64_t js_year) {
    int64_t aharkun = get_aharkun_js(js_year);
    int64_t a = 11 * aharkun + 650;
    return (aharkun + (a / 692)) % 30;
}

bool get_is_អធិកមាស(int64_t js_year) {
    int64_t bodithey = get_bodithey_js(js_year);
    if (bodithey == 24 && get_bodithey_js(js_year + 1) == 6) {
        return true;
    } else if (bodithey == 25 && get_bodithey(js_year + 1) == 5) {
        return false;
    } else if (bodithey > 24 || bodithey < 6) {
        return true;
    } else {
        return false;
    }
}

bool get_is_ចន្ទ្រាធិមាស(int64_t js_year) {
    int64_t avoman = get_avoman_js(js_year);
    bool is_solar_leap = get_kromthupul_js(js_year) <= 207;

    if (avoman == 0 && get_avoman_js(js_year - 1) == 137) {
        return true;
    } else if (is_solar_leap) {
        return avoman < 127;
    } else if (avoman == 137 && get_avoman_js(js_year + 1) == 0) {
        return false;
    } else if (avoman < 138) {
        return true;
    } else {
        return false;
    }
}

bool get_is_has_366_days(int64_t js_year) {
    return get_kromthupul_js(js_year) <= 207;
}

// ============================================================================
// KhmerMonth Implementation
// ============================================================================

KhmerMonth::KhmerMonth() : value(មិគសិរ) {}
KhmerMonth::KhmerMonth(Month m) : value(m) {}

KhmerMonth KhmerMonth::nextMonth(int64_t be_year) const {
    LeapType leap = get_leap_type(be_year);
    switch (value) {
        case មិគសិរ: return បុស្ស;
        case បុស្ស: return មាឃ;
        case មាឃ: return ផល្គុន;
        case ផល្គុន: return ចេត្រ;
        case ចេត្រ: return ពិសាខ;
        case ពិសាខ: return ជេស្ឋ;
        case ជេស្ឋ: return (leap == LeapType::បង្គ្រប់១ខែ) ? បឋមាសាឍ : អាសាឍ;
        case អាសាឍ: return ស្រាពណ៍;
        case ស្រាពណ៍: return ភទ្របទ;
        case ភទ្របទ: return អស្សុជ;
        case អស្សុជ: return កត្ដិក;
        case កត្ដិក: return មិគសិរ;
        case បឋមាសាឍ: return ទុតិយាសាឍ;
        case ទុតិយាសាឍ: return ស្រាពណ៍;
        default: return មិគសិរ;
    }
}

KhmerMonth KhmerMonth::previousMonth(int64_t be_year) const {
    LeapType leap = get_leap_type(be_year);
    switch (value) {
        case មិគសិរ: return កត្ដិក;
        case បុស្ស: return មិគសិរ;
        case មាឃ: return បុស្ស;
        case ផល្គុន: return មាឃ;
        case ចេត្រ: return ផល្គុន;
        case ពិសាខ: return ចេត្រ;
        case ជេស្ឋ: return ពិសាខ;
        case អាសាឍ: return ជេស្ឋ;
        case ស្រាពណ៍: return (leap == LeapType::បង្គ្រប់១ខែ) ? ទុតិយាសាឍ : អាសាឍ;
        case ភទ្របទ: return ស្រាពណ៍;
        case អស្សុជ: return ភទ្របទ;
        case កត្ដិក: return អស្សុជ;
        case ទុតិយាសាឍ: return បឋមាសាឍ;
        case បឋមាសាឍ: return ជេស្ឋ;
        default: return មិគសិរ;
    }
}

int64_t KhmerMonth::toNum() const {
    return static_cast<int64_t>(value);
}

std::string KhmerMonth::toString() const {
    switch (value) {
        case មិគសិរ: return "មិគសិរ";
        case បុស្ស: return "បុស្ស";
        case មាឃ: return "មាឃ";
        case ផល្គុន: return "ផល្គុន";
        case ចេត្រ: return "ចេត្រ";
        case ពិសាខ: return "ពិសាខ";
        case ជេស្ឋ: return "ជេស្ឋ";
        case អាសាឍ: return "អាសាឍ";
        case ស្រាពណ៍: return "ស្រាពណ៍";
        case ភទ្របទ: return "ភទ្របទ";
        case អស្សុជ: return "អស្សុជ";
        case កត្ដិក: return "កត្ដិក";
        case បឋមាសាឍ: return "បឋមាសាឍ";
        case ទុតិយាសាឍ: return "ទុតិយាសាឍ";
        default: return "";
    }
}

bool KhmerMonth::operator<(const KhmerMonth& other) const {
    return toNum() < other.toNum();
}

bool KhmerMonth::operator>(const KhmerMonth& other) const {
    return toNum() > other.toNum();
}

bool KhmerMonth::operator==(const KhmerMonth& other) const {
    return value == other.value;
}

bool KhmerMonth::operator!=(const KhmerMonth& other) const {
    return value != other.value;
}

int64_t get_number_of_day_in_month(const KhmerMonth& month, int64_t be_year) {
    LeapType leap = get_leap_type(be_year);
    switch (month.value) {
        case KhmerMonth::ជេស្ឋ:
            return (leap == LeapType::បង្គ្រប់១ថ្ងៃ) ? 30 : 29;
        case KhmerMonth::បឋមាសាឍ:
        case KhmerMonth::ទុតិយាសាឍ:
            return (leap == LeapType::បង្គ្រប់១ខែ) ? 30 : 0;
        case KhmerMonth::មិគសិរ:
        case KhmerMonth::មាឃ:
        case KhmerMonth::ចេត្រ:
        case KhmerMonth::ស្រាពណ៍:
        case KhmerMonth::អស្សុជ:
            return 29;
        default:
            return 30;
    }
}

int64_t get_number_of_day_in_year(int64_t be_year) {
    LeapType leap = get_leap_type(be_year);
    switch (leap) {
        case LeapType::បង្គ្រប់១ខែ: return 384;
        case LeapType::បង្គ្រប់១ថ្ងៃ: return 355;
        case LeapType::មិនបង្គ្រប់: return 354;
        default: return 354;
    }
}

// ============================================================================
// KhmerDay Implementation
// ============================================================================

KhmerDay::KhmerDay() : phase(កើត), day(1) {}
KhmerDay::KhmerDay(Phase p, uint8_t d) : phase(p), day(d) {}

KhmerDay KhmerDay::fromNumber(int64_t number) {
    if (number <= 15) {
        return KhmerDay(កើត, static_cast<uint8_t>(number));
    } else {
        return KhmerDay(រោច, static_cast<uint8_t>(number - 15));
    }
}

int64_t KhmerDay::toNumber() const {
    if (phase == កើត) {
        return day;
    } else {
        return 15 + day;
    }
}

std::string KhmerDay::toString() const {
    std::ostringstream oss;
    oss << static_cast<int>(day);
    if (phase == កើត) {
        oss << " កើត";
    } else {
        oss << " រោច";
    }
    return oss.str();
}

bool KhmerDay::operator==(const KhmerDay& other) const {
    return phase == other.phase && day == other.day;
}

bool KhmerDay::operator!=(const KhmerDay& other) const {
    return !(*this == other);
}

// ============================================================================
// KhmerDate Implementation
// ============================================================================

KhmerDate::KhmerDate() : day(), month(), exact_be_year(0) {}
KhmerDate::KhmerDate(const KhmerDay& d, const KhmerMonth& m, int64_t be)
    : day(d), month(m), exact_be_year(be) {}

// Helper functions for add/subtract (internal)
static int64_t reduce_count(int64_t& count, int64_t increment) {
    count -= increment;
    return increment;
}

static int64_t clear_count(int64_t& count) {
    int64_t value = count;
    count = 0;
    return value;
}

static int64_t increase_count(int64_t& count, int64_t increment) {
    count += increment;
    return increment;
}

KhmerDate KhmerDate::add(int64_t count) const {
    if (count < 0) {
        return subtract(static_cast<uint64_t>(-count));
    }

    int64_t increment = count;
    KhmerDate iter_date = *this;

    while (increment > 0) {
        if (iter_date.day == KhmerDay(KhmerDay::រោច, 1)) {
            if (iter_date.month == KhmerMonth(KhmerMonth::ពិសាខ)) {
                int64_t number_of_day_this_year = get_number_of_day_in_year(iter_date.exact_be_year);

                if (increment > number_of_day_this_year) {
                    reduce_count(increment, number_of_day_this_year);
                    iter_date = KhmerDate(KhmerDay(KhmerDay::រោច, 1),
                                         KhmerMonth(KhmerMonth::ពិសាខ),
                                         iter_date.exact_be_year + 1);
                    continue;
                }
            }

            KhmerMonth next_month = iter_date.month.nextMonth(iter_date.exact_be_year);
            int64_t year_of_next_month = (iter_date.month == KhmerMonth(KhmerMonth::ចេត្រ))
                                        ? iter_date.exact_be_year + 1
                                        : iter_date.exact_be_year;

            int64_t number_of_day_this_month = get_number_of_day_in_month(iter_date.month, iter_date.exact_be_year);

            if (increment > number_of_day_this_month) {
                reduce_count(increment, number_of_day_this_month);
                iter_date = KhmerDate(KhmerDay(KhmerDay::រោច, 1), next_month, year_of_next_month);
                continue;
            }
        }

        int64_t number_of_day_this_month = get_number_of_day_in_month(iter_date.month, iter_date.exact_be_year);

        if (increment <= number_of_day_this_month - iter_date.day.toNumber()) {
            KhmerDay new_day = KhmerDay::fromNumber(iter_date.day.toNumber() + clear_count(increment));

            if (iter_date.day.phase == KhmerDay::រោច) {
                iter_date = KhmerDate(new_day, iter_date.month, iter_date.exact_be_year);
            } else { // កើត
                int64_t new_be_year = iter_date.exact_be_year;
                if (iter_date.month == KhmerMonth(KhmerMonth::ពិសាខ) && new_day.phase == KhmerDay::រោច) {
                    new_be_year++;
                }
                iter_date = KhmerDate(new_day, iter_date.month, new_be_year);
            }
        } else {
            KhmerMonth next_month = iter_date.month.nextMonth(iter_date.exact_be_year);
            int64_t number_of_day_this_month = get_number_of_day_in_month(iter_date.month, iter_date.exact_be_year);

            int64_t day_increased = std::min(increment, number_of_day_this_month - iter_date.day.toNumber() + 16);

            KhmerDay new_day = KhmerDay::fromNumber(
                reduce_count(increment, day_increased) - (number_of_day_this_month - iter_date.day.toNumber())
            );

            int64_t year_of_next_month = iter_date.exact_be_year;
            if (next_month == KhmerMonth(KhmerMonth::ពិសាខ) && new_day.phase == KhmerDay::រោច) {
                year_of_next_month++;
            }

            iter_date = KhmerDate(new_day, next_month, year_of_next_month);
        }
    }

    return iter_date;
}

KhmerDate KhmerDate::subtract(uint64_t count) const {
    int64_t decrement = static_cast<int64_t>(count);
    KhmerDate iter_date = *this;

    while (decrement != 0) {
        if (decrement == 0) break;

        if (iter_date.day == KhmerDay(KhmerDay::រោច, 1)) {
            if (iter_date.month == KhmerMonth(KhmerMonth::ពិសាខ)) {
                int64_t number_of_day_previous_year = get_number_of_day_in_year(iter_date.exact_be_year - 1);

                if (decrement > number_of_day_previous_year) {
                    reduce_count(decrement, number_of_day_previous_year);
                    iter_date = KhmerDate(KhmerDay(KhmerDay::រោច, 1),
                                         KhmerMonth(KhmerMonth::ពិសាខ),
                                         iter_date.exact_be_year - 1);
                    continue;
                }
            }

            KhmerMonth previous_month = iter_date.month.previousMonth(iter_date.exact_be_year);
            int64_t year_of_previous_month = (iter_date.month == KhmerMonth(KhmerMonth::ពិសាខ))
                                            ? iter_date.exact_be_year - 1
                                            : iter_date.exact_be_year;
            int64_t number_of_day_previous_month = get_number_of_day_in_month(previous_month, year_of_previous_month);

            if (decrement > number_of_day_previous_month) {
                reduce_count(decrement, number_of_day_previous_month);
                iter_date = KhmerDate(KhmerDay(KhmerDay::រោច, 1), previous_month, year_of_previous_month);
                continue;
            }
        }

        if (decrement < iter_date.day.toNumber()) {
            KhmerDay new_day = KhmerDay::fromNumber(iter_date.day.toNumber() - clear_count(decrement));

            if (iter_date.day.phase == KhmerDay::កើត) {
                iter_date = KhmerDate(new_day, iter_date.month, iter_date.exact_be_year);
            } else { // រោច
                int64_t new_be_year = iter_date.exact_be_year;
                if (iter_date.month == KhmerMonth(KhmerMonth::ពិសាខ) && new_day.phase == KhmerDay::កើត) {
                    new_be_year--;
                }
                iter_date = KhmerDate(new_day, iter_date.month, new_be_year);
            }
        } else {
            KhmerMonth previous_month = iter_date.month.previousMonth(iter_date.exact_be_year);
            int64_t year_of_previous_month = (iter_date.month == KhmerMonth(KhmerMonth::ពិសាខ))
                                            ? iter_date.exact_be_year - 1
                                            : iter_date.exact_be_year;
            int64_t number_of_day_previous_month = get_number_of_day_in_month(previous_month, year_of_previous_month);

            int64_t day_decreased = std::min(decrement, iter_date.day.toNumber() + number_of_day_previous_month - 15 - 1);

            iter_date = KhmerDate(
                KhmerDay::fromNumber(number_of_day_previous_month + iter_date.day.toNumber() -
                                    reduce_count(decrement, day_decreased)),
                previous_month,
                year_of_previous_month
            );
        }
    }

    return iter_date;
}

// ============================================================================
// AnimalYear Implementation
// ============================================================================

AnimalYear::AnimalYear() : value(ជូត) {}
AnimalYear::AnimalYear(Animal a) : value(a) {}

AnimalYear AnimalYear::fromIndex(size_t index) {
    return AnimalYear(static_cast<Animal>(index % 12));
}

size_t AnimalYear::index() const {
    return static_cast<size_t>(value);
}

AnimalYear AnimalYear::add(int64_t count) const {
    int64_t new_index = (static_cast<int64_t>(index()) + count);
    // Proper modulo for negative numbers
    new_index = ((new_index % 12) + 12) % 12;
    return fromIndex(static_cast<size_t>(new_index));
}

std::string AnimalYear::toString() const {
    const char* names[] = {
        "ជូត", "ឆ្លូវ", "ខាល", "ថោះ", "រោង", "ម្សាញ់",
        "មមី", "មមែ", "វក", "រកា", "ច", "កុរ"
    };
    return names[index()];
}

// ============================================================================
// EraYear Implementation
// ============================================================================

std::string EraYear::fromJsYear(int64_t js_year) {
    int64_t remain = ((js_year % 10) + 10) % 10;
    const char* eras[] = {
        "សំរឹទ្ធិស័ក", "ឯកស័ក", "ទោស័ក", "ត្រីស័ក", "ចត្វាស័ក",
        "បញ្ចស័ក", "ឆស័ក", "សប្តស័ក", "អដ្ឋស័ក", "នព្វស័ក"
    };
    return eras[remain];
}

// ============================================================================
// DayOfWeek Implementation
// ============================================================================

DayOfWeek::DayOfWeek() : value(ចន្ទ) {}
DayOfWeek::DayOfWeek(Day d) : value(d) {}

DayOfWeek DayOfWeek::fromIndex(size_t index) {
    return DayOfWeek(static_cast<Day>(index % 7));
}

DayOfWeek DayOfWeek::subtract(size_t count) const {
    int64_t new_index = static_cast<int64_t>(value) - static_cast<int64_t>(count);
    new_index = ((new_index % 7) + 7) % 7;
    return fromIndex(static_cast<size_t>(new_index));
}

std::string DayOfWeek::toString() const {
    const char* names[] = {
        "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍", "អាទិត្យ"
    };
    return names[value];
}

// ============================================================================
// NewYear Structures Implementation
// ============================================================================

NewYearTime::NewYearTime() : hour(0), minute(0) {}
NewYearTime::NewYearTime(int64_t h, int64_t m) : hour(h), minute(m) {}

// Internal helper for NewYear calculations
// Shadow of the sun structure
struct ឆាយាព្រះអាទិត្យ {
    int64_t គុណ;
    int64_t ឆាយា;

    static ឆាយាព្រះអាទិត្យ from_khan(int64_t ខណ្ឌ) {
        switch (ខណ្ឌ) {
            case 0: return {35, 0};
            case 1: return {32, 35};
            case 2: return {27, 67};
            case 3: return {22, 94};
            case 4: return {13, 116};
            case 5: return {5, 129};
            default: return {0, 134};
        }
    }
};

struct ផលលម្អិត {
    int64_t មធ្យមព្រះអាទិត្យគិតជាលិប្ដា;
    int64_t កែន;
    int64_t ខណ្ឌ;
    int64_t pouichalip;
    int64_t រាសី;
    int64_t អង្សា;
    int64_t លិប្ដា;
};

struct មធ្យមព្រះអាទិត្យ {
    int64_t ចុល្លសករាជ;
    int64_t សុទិន;
    int64_t រាសី;
    int64_t អង្សា;
    int64_t លិប្ដា;

    static មធ្យមព្រះអាទិត្យ from(int64_t js_year, int64_t sotin) {
        int64_t kromathupul = get_kromthupul_js(js_year);
        int64_t d1 = (sotin * 800) + kromathupul;
        int64_t reasey = d1 / 24350;
        int64_t mod1 = d1 % 24350;
        int64_t angsa = mod1 / 811;
        int64_t mod2 = mod1 % 811;
        int64_t libda = (mod2 / 14) - 3;

        return {js_year, sotin, reasey, angsa, libda};
    }

    ផលលម្អិត រកផលលម្អិត() const {
        // Calculate មធ្យមព្រះអាទិត្យគិតជាលិប្ដា
        int64_t មធ្យមព្រះអាទិត្យគិតជាលិប្ដា;
        {
            int64_t r2 = 800 * សុទិន + get_kromthupul_js(ចុល្លសករាជ - 1);
            int64_t reasey = r2 / 24350;
            int64_t r3 = r2 % 24350;
            int64_t angsar = r3 / 811;
            int64_t r4 = r3 % 811;
            int64_t l1 = r4 / 14;
            int64_t libda = l1 - 3;
            មធ្យមព្រះអាទិត្យគិតជាលិប្ដា = (30 * 60 * reasey) + (60 * angsar) + libda;
        }

        // Calculate សំណល់
        int64_t សំណល់;
        {
            int64_t s1 = (30 * 60 * 2) + (60 * 20);
            int64_t left_over = មធ្យមព្រះអាទិត្យគិតជាលិប្ដា - s1;
            if (មធ្យមព្រះអាទិត្យគិតជាលិប្ដា < s1) {
                left_over += 30 * 60 * 12;
            }
            សំណល់ = left_over;
        }

        int64_t កែន = សំណល់ / (30 * 60);

        // Calculate សំណល់ចុងក្រោយ
        មធ្យមព្រះអាទិត្យ សំណល់ចុងក្រោយ;
        {
            int64_t រាសី_temp;
            if (កែន >= 0 && កែន <= 2) {
                រាសី_temp = កែន;
            } else if (កែន >= 3 && កែន <= 5) {
                រាសី_temp = (30 * 60 * 6) - សំណល់;
            } else if (កែន >= 6 && កែន <= 8) {
                រាសី_temp = សំណល់ - (30 * 60 * 6);
            } else if (កែន >= 9 && កែន <= 11) {
                រាសី_temp = ((30 * 60 * 11) + (60 * 29) + 60) - សំណល់;
            } else {
                រាសី_temp = -1;
            }

            សំណល់ចុងក្រោយ.ចុល្លសករាជ = ចុល្លសករាជ;
            សំណល់ចុងក្រោយ.សុទិន = សុទិន;
            សំណល់ចុងក្រោយ.រាសី = រាសី_temp / (30 * 60);
            សំណល់ចុងក្រោយ.អង្សា = (រាសី_temp % (30 * 60)) / 60;
            សំណល់ចុងក្រោយ.លិប្ដា = រាសី_temp % 60;
        }

        // Calculate khan and pouichalip
        int64_t khan, pouichalip;

        if (សំណល់ចុងក្រោយ.អង្សា >= 15) {
            khan = 2 * សំណល់ចុងក្រោយ.រាសី + 1;
            pouichalip = 60 * (សំណល់ចុងក្រោយ.អង្សា - 15) + សំណល់ចុងក្រោយ.លិប្ដា;
        } else {
            khan = 2 * សំណល់ចុងក្រោយ.រាសី;
            pouichalip = 60 * សំណល់ចុងក្រោយ.អង្សា + សំណល់ចុងក្រោយ.លិប្ដា;
        }

        // Get shadow
        ឆាយាព្រះអាទិត្យ chhaya = ឆាយាព្រះអាទិត្យ::from_khan(khan);

        // Calculate lup
        int64_t lup = (pouichalip * chhaya.គុណ) / 900;

        return ផលលម្អិត{
            មធ្យមព្រះអាទិត្យគិតជាលិប្ដា,
            កែន,
            khan,
            pouichalip,
            0,  // រាសី
            (lup + chhaya.ឆាយា) / 60,
            (lup + chhaya.ឆាយា) % 60
        };
    }

    int64_t សម្ពោធព្រះអាទិត្យ() const {
        ផលលម្អិត ផល = រកផលលម្អិត();
        int64_t ផលគិតជាលិប្ដា = (30 * 60 * ផល.រាសី) + (60 * ផល.អង្សា) + ផល.លិប្ដា;
        if (ផល.កែន <= 5) {
            return ផល.មធ្យមព្រះអាទិត្យគិតជាលិប្ដា - ផលគិតជាលិប្ដា;
        } else {
            return ផល.មធ្យមព្រះអាទិត្យគិតជាលិប្ដា + ផលគិតជាលិប្ដា;
        }
    }
};

// Internal Helper function declarations
static DayOfWeek រកថ្ងៃឡើងស័ក(int64_t be_year);
static std::pair<int64_t, KhmerMonth> រកបូតិថីឡើងស័ក(int64_t js_year);
static KhmerDate រកបរិច្ឆេទឡើងស័ក(int64_t js_year);

// Define them
DayOfWeek រកថ្ងៃឡើងស័ក(int64_t be_year) {
    int64_t វារៈឡើងស័ក = get_aharkun(be_year) % 7;
    DayOfWeek::Day days[] = {
        DayOfWeek::សៅរ៍, DayOfWeek::អាទិត្យ, DayOfWeek::ចន្ទ, DayOfWeek::អង្គារ,
        DayOfWeek::ពុធ, DayOfWeek::ព្រហស្បតិ៍, DayOfWeek::សុក្រ
    };
    return DayOfWeek(days[វារៈឡើងស័ក]);
}

std::pair<int64_t, KhmerMonth> រកបូតិថីឡើងស័ក(int64_t js_year) {
    int64_t bodithey = get_bodithey_js(js_year);
    if (bodithey >= 6) {
        if (get_is_អធិកមាស(js_year - 1) && get_is_ចន្ទ្រាធិមាស(js_year - 1)) {
            if (bodithey + 1 >= 30) {
                return {(bodithey + 1) % 30, KhmerMonth(KhmerMonth::ពិសាខ)};
            } else {
                return {bodithey + 1, KhmerMonth(KhmerMonth::ចេត្រ)};
            }
        } else {
            return {bodithey, KhmerMonth(KhmerMonth::ចេត្រ)};
        }
    } else {
        return {bodithey + 1, KhmerMonth(KhmerMonth::ពិសាខ)};
    }
}

KhmerDate រកបរិច្ឆេទឡើងស័ក(int64_t js_year) {
    auto [bodithey, month] = រកបូតិថីឡើងស័ក(js_year);
    KhmerDay day = KhmerDay::fromNumber(bodithey);

    int64_t be_year;
    if (month > KhmerMonth(KhmerMonth::ពិសាខ)) {
        be_year = js_to_be(js_year);
    } else if (month < KhmerMonth(KhmerMonth::ពិសាខ)) {
        be_year = js_to_be(js_year) - 1;
    } else {
        if (day.phase == KhmerDay::កើត) {
            be_year = js_to_be(js_year) - 1;
        } else {
            be_year = js_to_be(js_year);
        }
    }

    return KhmerDate(day, month, be_year);
}

static std::vector<មធ្យមព្រះអាទិត្យ> រកសុទិនចូលឆ្នាំ(int64_t js_year) {
    bool ឆ្នាំចាស់មាន៣៦៦ថ្ងៃ = get_is_has_366_days(js_year - 1);
    std::vector<int64_t> sotins = ឆ្នាំចាស់មាន៣៦៦ថ្ងៃ
        ? std::vector<int64_t>{363, 364, 365, 366}
        : std::vector<int64_t>{362, 363, 364, 365};

    std::vector<មធ្យមព្រះអាទិត្យ> result;
    for (int64_t sotin : sotins) {
        មធ្យមព្រះអាទិត្យ មធ្យម = មធ្យមព្រះអាទិត្យ::from(js_year, sotin);
        int64_t សម្ពោធព្រះអាទិត្យ = មធ្យម.សម្ពោធព្រះអាទិត្យ();
        int64_t រាសី = សម្ពោធព្រះអាទិត្យ / (30 * 60);
        int64_t អង្សា = (សម្ពោធព្រះអាទិត្យ % (30 * 60)) / 60;
        int64_t លិប្ដា = សម្ពោធព្រះអាទិត្យ % 60;

        result.push_back(មធ្យមព្រះអាទិត្យ{js_year, sotin, រាសី, អង្សា, លិប្ដា});
    }

    return result;
}

static NewYearTime រកម៉ោងចូលឆ្នាំ(int64_t js_year, const std::vector<មធ្យមព្រះអាទិត្យ>& sotins) {
    for (const auto& sotin : sotins) {
        if (sotin.អង្សា == 0) {
            int64_t minutes = (24 * 60) - (sotin.លិប្ដា * 24);
            return NewYearTime((minutes / 60) % 24, minutes % 60);
        }
    }

    return NewYearTime(0, 0);
}

static int64_t រកចំនួនថ្ងៃវ័នបត(int64_t js_year, const std::vector<មធ្យមព្រះអាទិត្យ>& sotins) {
    if (!sotins.empty() && sotins[0].អង្សា == 0) {
        return 2;
    } else {
        return 1;
    }
}

NewYearDayInfo NewYearDayInfo::fromJs(int64_t js_year) {
    auto sotins = រកសុទិនចូលឆ្នាំ(js_year);
    NewYearTime time = រកម៉ោងចូលឆ្នាំ(js_year, sotins);
    int64_t ចំនួនថ្ងៃវ័នបត = រកចំនួនថ្ងៃវ័នបត(js_year, sotins);

    KhmerDate date_lerngsak = រកបរិច្ឆេទឡើងស័ក(js_year);
    DayOfWeek day_of_week_lerngsak = រកថ្ងៃឡើងស័ក(js_to_be(js_year));
    KhmerDate date_new_year = date_lerngsak.subtract((ចំនួនថ្ងៃវ័នបត + 1));
    DayOfWeek day_of_week_new_year = day_of_week_lerngsak.subtract(ចំនួនថ្ងៃវ័នបត + 1);

    return {
        time,
        day_of_week_new_year,
        date_new_year,
        static_cast<uint8_t>(ចំនួនថ្ងៃវ័នបត),
        day_of_week_lerngsak,
        date_lerngsak
    };
}

NewYearDayInfo NewYearDayInfo::fromAd(int64_t ad_year) {
    return fromJs(ad_to_js(ad_year));
}

// ============================================================================
// Comparison Number Function
// ============================================================================

int64_t get_comparision_number(const KhmerMonth& month, const KhmerDay& day, uint32_t hour, uint32_t minute) {
    if (month == KhmerMonth(KhmerMonth::ចេត្រ) || month == KhmerMonth(KhmerMonth::ពិសាខ)) {
        return (month.toNum() * 30 + day.toNumber()) * 24 * 60 + (hour * 60 + minute);
    }
    throw std::runtime_error("get_comparision_number can only be used for ចេត្រ and ពិសាខ months");
}

// ============================================================================
// KhmerCalendar Implementation
// ============================================================================

KhmerCalendar::KhmerCalendar() : year(0), month(0), day(0), hour(0), minute(0), second(0),
                                   khmer_date(), animal(), js_year(0), new_year_info() {}

KhmerCalendar KhmerCalendar::epoch() {
    KhmerCalendar cal;
    cal.year = 1900;
    cal.month = 1;
    cal.day = 1;
    cal.hour = 0;
    cal.minute = 0;
    cal.second = 0;
    cal.khmer_date = KhmerDate(KhmerDay(KhmerDay::កើត, 1),
                               KhmerMonth(KhmerMonth::បុស្ស),
                               2443);
    cal.animal = AnimalYear(AnimalYear::កុរ);
    cal.js_year = 1261;
    cal.new_year_info = NewYearDayInfo::fromAd(1900);
    return cal;
}

KhmerCalendar KhmerCalendar::fromDateTime(int year, int month, int day,
                                  int hour, int minute, int second) {
    KhmerCalendar epoch_cal = epoch();

    // Calculate difference in days using Julian Day Number to avoid timezone issues
    auto julian_day = [](int y, int m, int d) -> int64_t {
        int a = (14 - m) / 12;
        int y_adj = y + 4800 - a;
        int m_adj = m + 12 * a - 3;
        return d + (153 * m_adj + 2) / 5 + 365 * y_adj +
               y_adj / 4 - y_adj / 100 + y_adj / 400 - 32045;
    };

    int64_t epoch_jdn = julian_day(epoch_cal.year, epoch_cal.month, epoch_cal.day);
    int64_t input_jdn = julian_day(year, month, day);
    int64_t diff_days = input_jdn - epoch_jdn;

    // Calculate Khmer date
    KhmerDate khmer_date;
    if (diff_days > 0) {
        khmer_date = epoch_cal.khmer_date.add(diff_days);
    } else if (diff_days < 0) {
        khmer_date = epoch_cal.khmer_date.subtract(static_cast<uint64_t>(-diff_days));
    } else {
        khmer_date = epoch_cal.khmer_date;
    }

    int64_t diff_year = year - epoch_cal.year;
    NewYearDayInfo new_year_info = NewYearDayInfo::fromAd(year);

    KhmerCalendar result;
    result.year = year;
    result.month = month;
    result.day = day;
    result.hour = hour;
    result.minute = minute;
    result.second = second;
    result.khmer_date = khmer_date;
    result.new_year_info = new_year_info;


    // Calculate animal year and JS year based on position relative to New Year and Leng Sak
    // For all months, we need to check if the current date is before or after these events

    if (khmer_date.month < KhmerMonth(KhmerMonth::ចេត្រ) || khmer_date.month > KhmerMonth(KhmerMonth::ពិសាខ)) {
        // For months មិគសិរ through ផល្គុន (< ចេត្រ) and months after ពិសាខ
        // We need to check if we're before/after this year's New Year by comparing Khmer dates

        //Convert the New Year and Leng Sak Khmer dates to day-of-year comparison
        // We'll use the fact that we know the relative ordering of months

        auto khmer_date_number = [](const KhmerMonth& month, const KhmerDay& day) -> int64_t {
            //  Assign a rough number based on month ordering
            // This is approximate but works forcomparison within same BE year
            return month.toNum() * 100 + day.toNumber();
        };

        int64_t current_khmer_num = khmer_date_number(khmer_date.month, khmer_date.day);
        int64_t new_year_num = khmer_date_number(new_year_info.date_new_year.month, new_year_info.date_new_year.day);
        int64_t lerngsak_num = khmer_date_number(new_year_info.date_lerngsak.month, new_year_info.date_lerngsak.day);

        // Adjust for wraparound - months < ចេត្រ wrap around the year
        // If current month < ចេត្រ (i.e., មិគសិរ through ផល្គុន), these come AFTER ពិសាខ chronologically
        if (khmer_date.month < KhmerMonth(KhmerMonth::ចេត្រ)) {
            current_khmer_num += 1400;  // Add offset to put them after month 14 (កត្ដិក)
        }

        // New Year is in month ចេត្រ or around there, no adjustment needed
        // Leng Sak is also in that range

        bool is_after_new_year = current_khmer_num >= new_year_num;
        bool is_after_lerngsak = current_khmer_num >= lerngsak_num;

        result.animal = epoch_cal.animal.add(is_after_new_year ? (diff_year + 1) : diff_year);
        result.js_year = epoch_cal.js_year + (is_after_lerngsak ? (diff_year + 1) : diff_year);

    } else {
        // Months ចេត្រ and ពិសាខ - need precise time comparison using get_comparision_number
        int64_t minute_as_comparision_number = get_comparision_number(
            khmer_date.month, khmer_date.day, hour, minute
        );

        int64_t new_year_minute_as_comparision_number = get_comparision_number(
            new_year_info.date_new_year.month,
            new_year_info.date_new_year.day,
            new_year_info.time.hour,
            new_year_info.time.minute
        );

        int64_t lerngsak_minute_as_comparision_number = get_comparision_number(
            new_year_info.date_lerngsak.month,
            new_year_info.date_lerngsak.day,
            0, 0
        );

        bool is_before_new_year = minute_as_comparision_number < new_year_minute_as_comparision_number;
        bool is_before_lerng_sak = minute_as_comparision_number < lerngsak_minute_as_comparision_number;

        result.animal = epoch_cal.animal.add(is_before_new_year ? diff_year : (diff_year + 1));
        result.js_year = is_before_lerng_sak
                       ? epoch_cal.js_year + diff_year
                       : epoch_cal.js_year + 1 + diff_year;
    }

    return result;
}

KhmerCalendar KhmerCalendar::from_khmer_date(const KhmerDate* khmer_date,
                                     const std::optional<std::pair<int, int>>& time_opt) {
    // Convert Khmer date to Gregorian
    int greg_year, greg_month, greg_day;
    if (!khmer_date->to_gregorian_date(greg_year, greg_month, greg_day)) {
        throw std::runtime_error("Failed to convert Khmer date to Gregorian");
    }

    int hour = 0, minute = 0;
    if (time_opt.has_value()) {
        hour = time_opt->first;
        minute = time_opt->second;
    }

    // Use fromDateTime to create the calendar with all calculated fields
    KhmerCalendar result = fromDateTime(greg_year, greg_month, greg_day, hour, minute, 0);

    // Override the khmer_date with the input to preserve exact values
    result.khmer_date = *khmer_date;

    return result;
}

// Added this strictly as alias because I defined it in the header but implementation uses from_khmer_date
KhmerCalendar KhmerCalendar::fromKhmerDate(const KhmerDate& date) {
    return from_khmer_date(&date, std::nullopt);
}

std::string KhmerCalendar::format() const {
    std::ostringstream oss;
    oss << khmer_date.day.toString() << " "
        << "ខែ " << khmer_date.month.toString() << " "
        << "ឆ្នាំ " << animal.toString() << " "
        << EraYear::fromJsYear(js_year) << " "
        << "ព.ស. " << khmer_date.exact_be_year;
    return oss.str();
}

std::string KhmerCalendar::toJson() const {
    std::ostringstream oss;
    oss << "{\n"
        << "  \"gregorian\": {\n"
        << "    \"year\": " << year << ",\n"
        << "    \"month\": " << month << ",\n"
        << "    \"day\": " << day << ",\n"
        << "    \"hour\": " << hour << ",\n"
        << "    \"minute\": " << minute << ",\n"
        << "    \"second\": " << second << "\n"
        << "  },\n"
        << "  \"khmer\": {\n"
        << "    \"day\": \"" << khmer_date.day.toString() << "\",\n"
        << "    \"month\": \"" << khmer_date.month.toString() << "\",\n"
        << "    \"be_year\": " << khmer_date.exact_be_year << ",\n"
        << "    \"js_year\": " << js_year << ",\n"
        << "    \"animal\": \"" << animal.toString() << "\",\n"
        << "    \"era\": \"" << EraYear::fromJsYear(js_year) << "\",\n"
        << "    \"formatted\": \"" << format() << "\"\n"
        << "  }\n"
        << "}";
    return oss.str();
}

// ============================================================================
// KhmerDate::to_gregorian_date Implementation
// (Must be after KhmerCalendar class definition due to circular dependency in original)
// ============================================================================

bool KhmerDate::to_gregorian_date(int& year, int& month, int& day) const {
    KhmerDate khmer_date = *this;
    int ad_year = static_cast<int>(be_to_ad(khmer_date.exact_be_year));

    // Get epoch date (Jan 1 of the AD year)
    KhmerCalendar epoch_date = KhmerCalendar::fromDateTime(ad_year, 1, 1, 0, 0, 0);

    // Calculate difference from epoch
    int64_t diff_from_epoch = 0;
    KhmerDate iter_date = epoch_date.khmer_date;
    int64_t count = 0;

    // Move to first day of the month
    if (iter_date.day == KhmerDay(KhmerDay::កើត, iter_date.day.day)) {
        iter_date = iter_date.add(increase_count(count, 16 - iter_date.day.day));
    } else { // រោច
        iter_date = iter_date.add(increase_count(count, 1 - iter_date.day.day));
    }

    // Iterate through months until we find the target month and year
    const int MAX_ITERATIONS = 400; // Safety limit
    int iterations = 0;
    while (iterations++ < MAX_ITERATIONS) {
        if (iter_date.month == khmer_date.month) {
            if (khmer_date.day == KhmerDay(KhmerDay::កើត, khmer_date.day.day) &&
                iter_date.month == KhmerMonth(KhmerMonth::ពិសាខ)) {
                if (iter_date.exact_be_year - 1 == khmer_date.exact_be_year) {
                    increase_count(count, khmer_date.day.toNumber() - 16);
                    break;
                }
            } else if (iter_date.exact_be_year == khmer_date.exact_be_year) {
                increase_count(count, khmer_date.day.toNumber() - 16);
                break;
            }
        }

        int64_t total_day_of_iter_month = get_number_of_day_in_month(iter_date.month, iter_date.exact_be_year);
        iter_date = iter_date.add(increase_count(count, total_day_of_iter_month));
    }

    diff_from_epoch = count;

    // Add days to epoch Gregorian date using Julian Day Number
    auto julian_day = [](int y, int m, int d) -> int64_t {
        int a = (14 - m) / 12;
        int y_adj = y + 4800 - a;
        int m_adj = m + 12 * a - 3;
        return d + (153 * m_adj + 2) / 5 + 365 * y_adj +
               y_adj / 4 - y_adj / 100 + y_adj / 400 - 32045;
    };

    auto jdn_to_gregorian = [](int64_t jdn, int& y, int& m, int& d) {
        int64_t a = jdn + 32044;
        int64_t b = (4 * a + 3) / 146097;
        int64_t c = a - (146097 * b) / 4;
        int64_t d_val = (4 * c + 3) / 1461;
        int64_t e = c - (1461 * d_val) / 4;
        int64_t m_val = (5 * e + 2) / 153;
        d = static_cast<int>(e - (153 * m_val + 2) / 5 + 1);
        m = static_cast<int>(m_val + 3 - 12 * (m_val / 10));
        y = static_cast<int>(100 * b + d_val - 4800 + m_val / 10);
    };

    int64_t epoch_jdn = julian_day(epoch_date.year, epoch_date.month, epoch_date.day);
    int64_t result_jdn = epoch_jdn + diff_from_epoch;
    jdn_to_gregorian(result_jdn, year, month, day);

    return true;
}
