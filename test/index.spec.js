import { mount } from '@vue/test-utils';
import IndexPage from '@/pages/index.vue';

describe('IndexPage', () => {
  const wrapper = mount(IndexPage);
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
