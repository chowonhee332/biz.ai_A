import re

with open('/Users/wonhee.cho/.gemini/antigravity/scratch/biz-ai-type-b/src/App.tsx', 'r') as f:
    text_b = f.read()

with open('/Users/wonhee.cho/.gemini/antigravity/scratch/biz-ai-type-a/src/App.tsx', 'r') as f:
    text_a = f.read()

def get_section(text, start_str, end_str):
    start_idx = text.find(start_str)
    if start_idx == -1: return ""
    end_idx = text.find(end_str, start_idx)
    if end_idx == -1: return ""
    return text[start_idx:end_idx + len(end_str)]

# 1. Grab StudioSection component from Type B
studio_sec_start = text_b.find("const StudioSection = () => {")
app_start_b = text_b.find("const App = () => {")
studio_sec_b = text_b[studio_sec_start:app_start_b]

# 2. Grab solution from Type B
solution_b = get_section(text_b, '<section id="solution" className="py-32 px-6">', '</section>')
# Inject Architecture span
sol_injection = """                <div className="text-center mb-20 font-pretendard flex flex-col items-center relative z-10">
                  <span className="text-[#FF2D2D] font-semibold text-[20px] mb-3 tracking-wide">
                    Architecture
                  </span>
"""
solution_b = solution_b.replace('                <div className="text-center mb-20 font-pretendard flex flex-col items-center relative z-10">\\n', sol_injection)

# 3. Grab use-cases from Type B
usecases_b = get_section(text_b, '<section id="use-cases" className="py-32 bg-[#000000] relative">', '</section>')
uc_injection = """            <div className="w-full mb-6 pt-[80px]">
              <span className="text-[#FF2D2D] font-bold text-[20px] mb-4 block tracking-tight">Use Cases</span>\\n"""
usecases_b = usecases_b.replace('            <div className="w-full mb-6 pt-[80px]">\\n', uc_injection)

# 4. Grab everything from logos to footer in Type B
logos_start = text_b.find('<section id="logos"')
footer_end = text_b.find('</footer>') + len('</footer>')
logos_to_footer_b = text_b[logos_start:footer_end]

stats_injection = """            <div className="text-center mb-32">
              <span className="text-red-600 text-[20px] font-bold mb-4 block tracking-wider">Trust</span>\\n"""
logos_to_footer_b = logos_to_footer_b.replace('            <div className="text-center mb-32">\\n', stats_injection)

# 5. ProcessSection component from Type B
process_sec_start = text_b.find("const ProcessSection = () => {")
domain_accord_start = text_b.find("const DomainAccordionItem =")
process_sec_b = text_b[process_sec_start:domain_accord_start]

ps_injection = """            <div className="text-center mb-24">
              <span className="text-red-600 text-[20px] font-bold mb-4 block tracking-wider">Why kt ds</span>\\n"""
process_sec_b = process_sec_b.replace('            <div className="text-center mb-24">\\n', ps_injection)

# Modify text_a
# a. Replace ProcessSection
text_a = re.sub(r'const ProcessSection = \(\) => \{.+?^const DomainAccordionItem =', process_sec_b.strip() + '\\n\\nconst DomainAccordionItem =', text_a, flags=re.DOTALL | re.MULTILINE)

# b. Insert StudioSection if not exists
if "const StudioSection" not in text_a:
    text_a = text_a.replace("const App = () => {", studio_sec_b.strip() + "\\n\\nconst App = () => {")

# c. Replace solution
text_a = re.sub(r'<section id="solution".+?</section>', solution_b, text_a, count=1, flags=re.DOTALL)

# d. Replace use-cases down to footer
rest_a_start = text_a.find('<section id="use-cases"')
rest_a_end = text_a.find('</footer>') + len('</footer>')

rest_b_content = usecases_b + "\\n\\n        <ProcessSection />\\n\\n\\n        " + logos_to_footer_b

text_a = text_a[:rest_a_start] + rest_b_content + text_a[rest_a_end:]

with open('/Users/wonhee.cho/.gemini/antigravity/scratch/biz-ai-type-a/src/App.tsx', 'w') as f:
    f.write(text_a)

print("Patch applied.")
