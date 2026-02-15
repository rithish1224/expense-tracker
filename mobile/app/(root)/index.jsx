import { SignOutButton } from '../../components/SignOutButton'
import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { useTransactions } from '../../hooks/useTransactions'

export default function Page() {
  const { user } = useUser()
  const {transactions,summary,idLoading,loadData,deleteTransaction} = useTransactions(user.id)

  useEffect(() => {
    loadData()
  },[loadData])

  console.log("transactions:", transactions);
  console.log("summary:",summary);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text style={styles.link}>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text style={styles.link}>Sign up</Text>
        </Link>
      </SignedOut>
      {/* Show the sign-out button when the user is signed in */}
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: '#0a7ea4',
    fontWeight: '600',
    fontSize: 16,
  },
})