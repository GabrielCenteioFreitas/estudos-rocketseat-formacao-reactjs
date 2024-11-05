import { Text, TextProps } from '@ignite-ui/react'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto saepe eveniet esse dicta, voluptas maiores quisquam placeat ad pariatur. Velit rem, optio quisquam nulla corrupti repudiandae minus ea. Id, debitis.',
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong text',
    as: 'strong',
  }
}