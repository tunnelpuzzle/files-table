import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';

describe('BaseCheckbox', () => {
  it('has the correct base class', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'id',
        label: 'Checkbox',
        showLabel: true,
        modelValue: false,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });
    expect(wrapper.find('input').classes('base-checkbox')).toBe(true);
  });

  it('sets the initial checkbox v-model value', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'id',
        label: 'Checkbox',
        showLabel: true,
        modelValue: true,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    expect(wrapper.props('modelValue')).toBe(true);
  });

  it('changes the checkbox v-model value', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'id',
        label: 'Checkbox',
        showLabel: true,
        modelValue: false,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.props('modelValue')).toBe(true);
  });

  it('changes the checkbox value to null', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'id',
        label: 'Label',
        showLabel: false,
        modelValue: false,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    await wrapper.setProps({ modelValue: null });
    expect(wrapper.props('modelValue')).toBe(null);
  });

  it('is indeterminate when the v-model is null', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'id',
        label: 'Label',
        showLabel: false,
        modelValue: null,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    expect(wrapper.find('input:indeterminate').exists()).toBe(true);
  });

  it('has the correct label text', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'id',
        label: 'Custom Label',
        showLabel: true,
        modelValue: false,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    expect(wrapper.find('label').text()).toBe('Custom Label');
  });

  it('hides the label when showLabel is false', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'id',
        label: 'Label',
        showLabel: false,
        modelValue: false,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    expect(wrapper.find('label').classes('sr-only')).toBe(true);
  });

  it('associates the input and label with the id', async () => {
    const customId = 'custom-id';
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: customId,
        label: 'Label',
        showLabel: false,
        modelValue: false,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    expect(wrapper.find('label').attributes('for')).toBe(customId);
    expect(wrapper.find('input').attributes('id')).toBe(customId);
  });

  it('passes through classes and other props to the input element', async () => {
    const customId = 'custom-id';
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: customId,
        class: 'test-class',
        'data-any': 'dataValue',
        label: 'Label',
        showLabel: false,
        modelValue: false,
        'onUpdate:modelValue': (e: boolean | null) => wrapper.setProps({ modelValue: e })
      }
    });

    expect(wrapper.find('input').attributes('data-any')).toBe('dataValue');
    expect(wrapper.find('input').classes('test-class')).toBe(true);
  });
});
