import { getSiteSettings } from '@/sanity/lib/fetch';
import { SurveyContent } from '@/components/SurveyContent';

export const revalidate = 60;

export default async function SurveyPage() {
  const settings = await getSiteSettings();

  return (
    <SurveyContent
      surveyUrl={settings?.surveyUrl || null}
      surveyResponses={settings?.surveyResponses || '500+'}
      surveyCountries={settings?.surveyCountries || '5'}
      surveyCompletion={settings?.surveyCompletion || '92%'}
    />
  );
}
