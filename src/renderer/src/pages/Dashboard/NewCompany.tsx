import { Layout, FormLayout } from '@renderer/components/layouts'
import {
  TextInput,
  FileInput,
  Avatar,
  Center,
  Stack,
  Select,
  NumberInput,
  Button,
  LoadingOverlay
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { fireStore, storage } from '@renderer/services/firebase'
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { ref, uploadString } from 'firebase/storage'
import { spaceToDash } from '@renderer/services/utils'
import { IconCheck, IconCross } from '@renderer/components/icons'
import { useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { useAdminChecker } from '@renderer/services/hooks'
import NotFoundTitle from '@renderer/components/page/Access'

interface FormValues {
  name: string
  type: string
  owner: string
  mobileNumber: number
  address: string
  creator: string
}

export default function NewCompany(): JSX.Element {
  const [image, setImage] = useState<string>('')
  const [isAdmin] = useAdminChecker()
  const [users, setUsers] = useState<{ value: string; label: string }[]>([{ value: '', label: '' }])
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      type: '',
      owner: '',
      mobileNumber: 0,
      address: '',
      creator: ''
    }
  })

  const getAllUsers = async (): Promise<void> => {
    try {
      const docSnap = await getDoc(doc(fireStore, 'company', 'allUsers'))
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data()?.users)
        const updatedData = docSnap.data()?.users.map((user: { uid: string; name: string }) => ({
          value: user.uid,
          label: user.name
        }))
        setUsers(updatedData)
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  // Fetching all users
  useEffect(() => {
    getAllUsers()
  }, [])

  const handleFileUpload = (file: File): void => {
    const reader = new FileReader()
    reader.onloadend = (): void => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const save = async (values: FormValues): Promise<void> => {
    try {
      notifications.show({
        id: 'load-data',
        loading: true,
        title: 'Saving Company',
        message: 'Data is saving on the server, please wait.',
        autoClose: false,
        withCloseButton: false
      })

      const nameInSpaceToDash = spaceToDash(values.name)

      // Save the image with company-name
      const storageRef = ref(storage, `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`)

      // 1. Uploading image
      await uploadString(storageRef, image, 'data_url')

      // 2. Saving paper
      await setDoc(doc(fireStore, `papers`, `${nameInSpaceToDash}`), {
        name: values.name,
        type: values.type,
        owner: values.owner,
        mobileNumber: values.mobileNumber,
        address: values.address,
        logo: `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`
      })

      // 3. Assign paper to user
      await updateDoc(doc(fireStore, 'users', values.creator), {
        papers: arrayUnion(nameInSpaceToDash)
      })

      notifications.update({
        id: 'load-data',
        color: 'teal',
        title: 'Saved',
        message: 'Data now saved on the server.',
        icon: <IconCheck size="1rem" />,
        autoClose: 2000
      })

      navigate('/')
      console.log('Saved')
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      notifications.update({
        id: 'load-data',
        color: 'red',
        title: `Error ${errorCode}`,
        message: errorMessage,
        icon: <IconCross size="1rem" />,
        autoClose: 2000
      })
    }
  }

  if (isAdmin === false) {
    return <NotFoundTitle />
  }

  if (isAdmin === true) {
    return (
      <Layout size="sm" isBack>
        <FormLayout title="New Company!">
          <form onSubmit={(): any => form.onSubmit((values) => save(values))}>
            <Center>
              <Avatar size={100} radius="lg" src={image} />
            </Center>
            <Stack spacing={10}>
              <TextInput
                placeholder="Name"
                label="Full name"
                withAsterisk
                required
                {...form.getInputProps('name')}
              />
              <FileInput
                accept="image/*"
                label="Logo"
                placeholder="Upload logo"
                onChange={handleFileUpload}
              />
              <Select
                label="Type"
                placeholder="Pick one"
                data={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' }
                ]}
                {...form.getInputProps('type')}
                required
              />
              <TextInput
                placeholder="Owner"
                label="Owner name"
                withAsterisk
                required
                {...form.getInputProps('owner')}
              />
              <NumberInput
                placeholder="Mobile Number"
                label="Number"
                withAsterisk
                hideControls
                required
                {...form.getInputProps('mobileNumber')}
              />
              <TextInput
                placeholder="Address"
                label="Full Address"
                withAsterisk
                required
                {...form.getInputProps('address')}
              />
              <Select
                data={users}
                placeholder="Pick one"
                label="Creator"
                withAsterisk
                required
                {...form.getInputProps('creator')}
                maxDropdownHeight={160}
              />
              <Button fullWidth type="submit">
                Save
              </Button>
            </Stack>
          </form>
        </FormLayout>
      </Layout>
    )
  }

  return <LoadingOverlay visible={true} />
}
