import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import FilesTable from '@/components/filesTable/FilesTable.vue';

describe('FilesTable', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(FilesTable);
    wrapper.vm.setAllRowsSelected(false);
  });

  it('opens the correct download alert when no items are selected', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockResolvedValue();
    wrapper.find('.download-btn').trigger('click');
    expect(alertSpy).toHaveBeenCalledWith('No files selected.');
  });

  it('opens the correct download alert when one row is selected.', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockResolvedValue();
    wrapper.vm.tableData[2].selected = true;
    await wrapper.vm.$nextTick();
    wrapper.find('.download-btn').trigger('click');
    expect(alertSpy).toHaveBeenCalledWith(
      'Downloaded Files:\nPeach \\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll\n'
    );
  });

  it('opens the correct download alert when all items are selected', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockResolvedValue();
    wrapper.find('.select-all-checkbox').trigger('change');
    wrapper.find('.download-btn').trigger('click');
    const expectedText =
      'Downloaded Files:\nLuigi \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe\nPeach \\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll\n4 files are unavailable to be downloaded.';
    expect(alertSpy).toHaveBeenCalledWith(expectedText);
  });

  it('has the indeterminate state for the select all checkbox when one row is selected', async () => {
    wrapper.vm.tableData[2].selected = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input.select-all-checkbox:indeterminate').exists()).toBe(true);
  });

  it('has the unchecked state for the select all checkbox when zero rows are selected', () => {
    expect(
      wrapper.find('input.select-all-checkbox:not(:indeterminate):not(:checked)').exists()
    ).toBe(true);
  });

  it('has the checked state for the select all checkbox when all rows are selected', async () => {
    wrapper.find('.select-all-checkbox').trigger('change');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input.select-all-checkbox:checked').exists()).toBe(true);
  });

  it('shows the correct table header text', () => {
    expect(wrapper.find('thead tr').text()).toBe('CheckboxNameDevicePathStatus IconStatus');
  });

  it('shows the correct table row text', () => {
    expect(wrapper.find('tbody tr').text()).toBe(
      'Select Rowsmss.exeMario\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exeScheduled'
    );
  });

  it('correctly formats the status column text', () => {
    expect(wrapper.find('td.status-column').text()).toBe('Scheduled');
  });

  it('has the selected-row class for a selected row', async () => {
    wrapper.vm.tableData[0].selected = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.selected-row').exists()).toBe(true);
  });

  it('selects a row when the .files-table-row element is clicked', async () => {
    wrapper.find('.files-table-row').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.tableData[0].selected).toBe(true);
  });
});
