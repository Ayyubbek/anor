import { Stack } from '@mantine/core'
import { HeaderComponent } from '../components/home/HeaderComponent.tsx'
import { Assets } from '../components/home/Assets.tsx'
import { Statistics } from '../components/home/Statistics.tsx'
import { DownloadSection } from '../components/home/DownloadSection.tsx'
import { ProductsSection } from '../components/home/ProductsSection.tsx'
import { FeatureSplit } from '../components/home/FeatureSplit.tsx'
import { SearchBanner } from '../components/home/SearchBanner.tsx'
import { Footer } from '../components/home/Footer.tsx'

export function HomePage() {
  return (
    <Stack gap={0}>
      <HeaderComponent />
      <Assets />
      <FeatureSplit />
      <ProductsSection />
      <Statistics />
      <DownloadSection />
      <SearchBanner />
      <Footer />
    </Stack>
  )
}
